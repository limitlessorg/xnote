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
      orderBy: { updatedAt: 'desc' },
    });
  }

  /**
   * 修改
   * @param id 主键
   * @param data 修改的数据
   * @returns 结果
   */
  @Patch('update/:id')
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
   * 搜索
   * @param value 值
   * @param payload 载荷信息
   * @returns Block块
   */
  @Get('search/:value')
  async search(@Param('value') value: string, @ReqPayload() payload: Payload) {
    let blocks = await this.prismaSrv.block.findMany({
      where: {
        spaceId: payload.spaceId,
      },
    });
    blocks = blocks.filter((b) => {
      return b.content && JSON.stringify(b.content).indexOf(value) > -1;
    });
    return blocks;
  }
}
