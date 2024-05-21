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
import { TemplateService } from './template.service';
import { SkipAuthGuard } from 'src/share/decorators/skip-guard.decorator';

@Controller('template')
export class TemplateController {
  constructor(
    private readonly templateSrv: TemplateService,
    private readonly prismaSrv: PrismaService,
  ) {}

  /**
   * 查找单个
   * @param id 主键
   * @param payload 载荷信息
   * @returns 模板
   */
  @Get('/:id')
  @SkipAuthGuard()
  get(@Param('id') id: string) {
    return this.prismaSrv.template.findFirst({
      where: { id },
      include: {
        block: true,
      },
    });
  }

  /**
   * 创建模板
   * @param body 信息
   * @param payload 载荷信息
   * @returns 创建结果
   */
  @Post('create')
  create(
    @Body()
    body: {
      blockId: string;
      title: string;
      scope: string;
      category: string;
      description?: string;
    },
    @ReqPayload() payload: Payload,
  ) {
    const { blockId, title, scope, category, description } = body;
    const template: Prisma.TemplateUncheckedCreateInput = {
      blockId,
      userId: payload.userId,
      title,
      scope,
      category,
      description,
    };
    return this.prismaSrv.template.create({
      data: template,
    });
  }

  /**
   * 获取模板列表
   * @param payload 载荷信息
   * @returns 模板列表
   */
  @Post('findMany')
  @SkipAuthGuard()
  findMany(@Body() where: Prisma.TemplateWhereInput) {
    return this.prismaSrv.template.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      include: {
        block: true,
        user: true,
      },
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
    @Body() data: Prisma.TemplateUpdateInput,
    @ReqPayload() payload: Payload,
  ) {
    return this.prismaSrv.template.update({
      where: { id, userId: payload.userId },
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
  delete(@Param('id') id: string, @ReqPayload() payload: Payload) {
    return this.prismaSrv.template.deleteMany({
      where: { id, userId: payload.userId },
    });
  }

  /**
   * 搜索
   * @param value 值
   * @param payload 载荷信息
   * @returns Block块
   */
  @Post('search/:category')
  @SkipAuthGuard()
  async search(
    @Param('category') category: string,
    @Body() body: { value: string },
  ) {
    const categoryWhere = category == 'all' ? {} : { category };
    return this.prismaSrv.template.findMany({
      where: {
        ...categoryWhere,
        OR: [
          {
            block: {
              remark: { contains: body.value },
            },
          },
          { title: { contains: body.value } },
          { description: { contains: body.value } },
        ],
      },
      include: {
        block: true,
        user: {
          select: {
            id: true,
            name: true,
            logo: true,
          },
        },
      },
    });
  }
}
