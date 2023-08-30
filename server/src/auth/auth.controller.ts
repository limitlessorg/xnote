import { Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/dto/Login.dto';
import { RegisterDto } from 'src/dto/Register.dto';
import { ReqPayload } from 'src/share/decorators/space.decorator';
import { AuthService } from './auth.service';
import { Payload } from 'src/interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authSrv: AuthService,
    private readonly jwtSrv: JwtService,
  ) {}

  /**
   * 登录
   * @param req 请求
   * @returns
   */
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authSrv.login(loginDto);
  }

  /**
   * 注册
   * @param registerDto 注册信息
   * @returns
   */
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authSrv.register(registerDto);
  }

  /**
   * 刷新token
   * @param space 空间
   * @returns
   */
  @Post('refresh')
  async refresh(@ReqPayload() payload: Payload) {
    return Object.assign(
      payload,
      { token: this.jwtSrv.sign(payload) },
      { expiresIn: +process.env.EXPRIRES_IN },
    );
  }
}
