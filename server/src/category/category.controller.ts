import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { PrismaService } from 'src/share/service/prisma.service';
import { SkipAuthGuard } from 'src/share/decorators/skip-guard.decorator';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categorySrv: CategoryService,
    private readonly prismaSrv: PrismaService,
  ) {}

  /**
   * 获取Options
   */
  @Get('getOptions')
  @SkipAuthGuard()
  async getOptions() {
    const categories = await this.prismaSrv.category.findMany();
    return categories.map((c) => {
      return { label: c.name, value: c.code };
    });
  }
}
