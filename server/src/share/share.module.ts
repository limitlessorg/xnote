import { Global, Module } from '@nestjs/common';
import { PrismaService } from './service/prisma.service';
import { TreeService } from './service/tree.service';

const services = [PrismaService, TreeService];

@Global()
@Module({
  providers: [...services],
  exports: [...services],
})
export class ShareModule {}
