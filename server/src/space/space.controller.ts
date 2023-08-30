import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Space } from '@prisma/client';
import { Payload } from 'src/interface';
import { ReqPayload } from 'src/share/decorators/space.decorator';
import { PrismaService } from 'src/share/service/prisma.service';
import { SpaceService } from './space.service';

@Controller('space')
export class SpaceController {
  constructor(
    private readonly spaceSrv: SpaceService,
    private readonly prismaSrv: PrismaService,
  ) {}

  /**
   * 获取信息
   */
  @Get('/:id')
  get(@Param('id') id: string) {
    return this.prismaSrv.space.findUnique({
      where: { id },
    });
  }

  /**
   * 创建
   * @param space 空间信息
   * @param payload 载荷信息
   * @returns 创建结果
   */
  @Post('create')
  create(
    @Body()
    space: Space,
    @ReqPayload() payload: Payload,
  ) {
    return this.prismaSrv.space.create({
      data: {
        ...space,
        users: {
          connect: {
            id: payload.userId,
          },
        },
      },
    });
  }

  /**
   * 修改
   * @param body 空间信息
   * @param payload 载荷信息
   * @returns 创建结果
   */
  @Patch('/:id')
  Patch(
    @Body()
    body: { name: string; logo: string },
    @Param('id') id: string,
    @ReqPayload() payload: Payload,
  ) {
    return this.prismaSrv.space.update({
      where: { id, users: { some: { id: payload.userId } } },
      data: body,
    });
  }
}
