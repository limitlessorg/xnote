import { Injectable } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { Payload } from './interface';
import { PrismaService } from './share/service/prisma.service';

@Injectable()
export class AppService {
  constructor(
    private readonly prismaSrv: PrismaService,
    private readonly authSrv: AuthService,
  ) {}

  /**
   * 获取应用信息
   * @param payload Token载荷
   * @param spaceId 当前空间ID
   * @returns 应用信息
   */
  async getAppData(payload: Payload, spaceId?: string): Promise<any> {
    // 1、获取用户信息
    const user = await this.prismaSrv.user.findUnique({
      where: { id: payload.userId },
      include: {
        spaces: true,
      },
    });
    // 2、获取空间、载荷
    const curSpace =
      user.spaces.find((s) => s.id === spaceId) || user.spaces[0];
    const newPayload: Payload = {
      userId: user.id,
      userName: user.name,
      spaceType: curSpace.spaceType,
      spaceId: curSpace.id,
    };
    // 3、生成应用信息
    const appData = {
      user: {
        id: user.id,
        name: user.name,
        code: user.code,
        logo: user.logo,
        phone: user.phone,
        email: user.email,
        wechat: user.wechat,
        remark: user.remark,
      },
      space: curSpace,
      spaces: user.spaces,
      auth: {
        token: this.authSrv.sign(newPayload),
        expiresIn: new Date().getTime() + +process.env.EXPRIRES_IN,
      },
    };
    return appData;
  }
}
