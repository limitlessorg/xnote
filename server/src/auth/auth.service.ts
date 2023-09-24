import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { SpaceType, User } from '@prisma/client';
import { AES, enc } from 'crypto-js';
import { Payload } from 'src/interface';
import { LoginDto } from 'src/dto/Login.dto';
import { RegisterDto } from 'src/dto/Register.dto';
import { R } from 'src/share/dto/res.dto';
import { PrismaService } from 'src/share/service/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtSrv: JwtService,
    private readonly prismaSrv: PrismaService,
  ) {}

  /**
   * 登录
   * @param user 用户
   * @returns
   */
  async login(loginDto: LoginDto) {
    const res = await this.validate(loginDto.account, loginDto.password);
    if (!res.result) {
      return R.fail(res.msg);
    }
    const user = res.user;
    const payload = {
      userId: user.id,
      userName: user.name,
    };
    return {
      token: this.jwtSrv.sign(payload),
      expiresIn: +process.env.EXPRIRES_IN,
    };
  }

  /**
   * 注册
   * @param registerDto 注册信息
   * @returns
   */
  async register(registerDto: RegisterDto) {
    const dbUser = await this.prismaSrv.user.findUnique({
      where: { code: registerDto.code },
    });
    if (dbUser) {
      return R.fail('此账号已存在');
    }
    // 创建用户
    const user = await this.prismaSrv.user.create({
      data: {
        name: registerDto.code,
        code: registerDto.code,
        password: AES.encrypt(
          registerDto.password,
          process.env.PASSWORD_SALT,
        ).toString(),
        spaces: {
          create: [{ spaceType: 'personal', name: '个人空间' }],
        },
      },
    });

    const payload: Payload = {
      userId: user.id,
      userName: user.name,
      spaceType: SpaceType.personal,
    };
    return Object.assign(
      payload,
      { logo: user.logo },
      { token: this.jwtSrv.sign(payload) },
      { expiresIn: +process.env.EXPRIRES_IN },
    );
  }

  /**
   * 生成token
   * @returns token
   */
  sign(
    payload: string | any | Buffer = {},
    options: JwtSignOptions = { secret: process.env.TOKEN_SECRET },
  ): string {
    return this.jwtSrv.sign(payload, options);
  }

  /**
   * 登录校验
   * @param code 用户账号
   * @param password 密码
   * @returns
   */
  async validate(
    code: string,
    password: string,
  ): Promise<{ result: boolean; user?: User; msg?: string }> {
    const user = await this.prismaSrv.user.findUnique({ where: { code } });
    if (!user) {
      return { result: false, msg: '用户不存在' };
    } else if (
      password ===
      AES.decrypt(user.password, process.env.PASSWORD_SALT).toString(enc.Utf8)
    ) {
      return { result: true, user: user };
    } else {
      return { result: false, msg: '用户名或者密码错误' };
    }
  }

  /**
   * token校验
   * @returns 载荷信息payload
   */
  verify(
    token: string,
    options: JwtSignOptions = { secret: process.env.TOKEN_SECRET },
  ): any {
    token = token.replace('Bearer ', '');
    return this.jwtSrv.verify(token, options);
  }
}
