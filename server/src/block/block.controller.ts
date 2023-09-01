import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Payload } from 'src/interface';
import { ReqPayload } from 'src/share/decorators/space.decorator';
import { PrismaService } from 'src/share/service/prisma.service';
import { BlockService } from './block.service';

@Controller('block')
export class BlockController {
  constructor(
    private readonly blockSrv: BlockService,
    private readonly prismaSrv: PrismaService,
  ) {}

  /**
   * 查找单个
   * @param id 主键
   * @param payload 载荷信息
   * @returns Block块
   */
  @Get('/:id')
  get(@Param('id') id: string, @ReqPayload() payload: Payload) {
    return this.prismaSrv.block.findFirst({
      where: { id, spaceId: payload.spaceId },
      include: {
        items: true,
      },
    });
  }

  /**
   * 创建块
   * @param body 信息
   * @param payload 载荷信息
   * @returns 创建结果
   */
  @Post('create')
  create(
    @Body()
    body: {
      blockType: string;
      content?: any;
      parentId?: string;
      containerId?: string;
      layout?: any[];
    },
    @ReqPayload() payload: Payload,
  ) {
    const block: Prisma.BlockUncheckedCreateInput = {
      spaceId: payload.spaceId,
      blockType: body.blockType,
      content: body.content,
      parentId: body.parentId,
      layout: body.layout,
    };
    if (body.containerId) {
      return this.prismaSrv.block.create({
        data: {
          ...block,
          container: {
            connect: {
              id: body.containerId,
            },
          },
        },
      });
    } else {
      return this.prismaSrv.block.create({
        data: block,
      });
    }
  }

  /**
   * 获取 Block 列表
   * @param payload 载荷信息
   * @returns Block列表
   */
  @Post('findMany')
  findMany(
    @ReqPayload() payload: Payload,
    @Body() where: Prisma.BlockWhereInput,
  ) {
    return this.prismaSrv.block.findMany({
      where: { ...where, spaceId: payload.spaceId },
      orderBy: { id: 'asc' },
    });
  }

  /**
   * 修改
   * @param id 主键
   * @param data 修改的数据
   * @returns 结果
   */
  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() data: Prisma.BlockUpdateInput,
    @ReqPayload() payload: Payload,
  ) {
    return this.prismaSrv.block.update({
      where: { id, spaceId: payload.spaceId },
      data,
    });
  }

  /**
   * 删除
   * @param id 主键
   * @param payload 载荷数据
   * @returns 结果
   */
  @Delete('/:id')
  async delete(@Param('id') id: string, @ReqPayload() payload: Payload) {
    const deleteItems = this.prismaSrv.block.deleteMany({
      where: { spaceId: payload.spaceId, container: { some: { id } } },
    });
    const deleteBlock = this.prismaSrv.block.delete({
      where: { id, spaceId: payload.spaceId },
    });
    return await this.prismaSrv.$transaction([deleteItems, deleteBlock]);
  }

  /**
   * 搜索
   * @param value 值
   * @param payload 载荷信息
   * @returns Block块
   */
  @Get('search/:value')
  async search(@Param('value') value: string, @ReqPayload() payload: Payload) {
    return this.prismaSrv.block.findMany({
      where: {
        spaceId: payload.spaceId,
        remark: { contains: value },
      },
      include: {
        container: true,
      },
    });
  }
}
