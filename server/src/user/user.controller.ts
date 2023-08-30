import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { User } from '@prisma/client';
import { Payload } from 'src/interface';
import { ReqPayload } from 'src/share/decorators/space.decorator';
import { PrismaService } from 'src/share/service/prisma.service';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userSrv: UserService,
    private readonly prismaSrv: PrismaService,
  ) {}

  /**
   * 获取用户信息
   */
  @Get('/:id')
  get(@Param('id') id: string) {
    return this.prismaSrv.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        code: true,
        logo: true,
        remark: true,
        password: false,
      },
    });
  }

  /**
   * 修改信息
   * @param user 用户信息
   * @param payload 载荷
   */
  @Patch()
  async Patch(@Body() user: User, @ReqPayload() payload: Payload) {
    const res = await this.prismaSrv.user.update({
      where: { id: payload.userId },
      data: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        logo: user.logo,
        remark: user.remark,
      },
    });
    return {
      id: res.id,
      name: res.name,
      code: res.code,
      email: user.email,
      phone: user.phone,
      logo: user.logo,
      wechat: user.wechat,
      remark: user.remark,
    };
  }
}
