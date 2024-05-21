import { Module } from '@nestjs/common';
import { MinioService } from './minio/minio.service';
import { MinioController } from './minio/minio.controller';

@Module({
  providers: [MinioService],
  controllers: [MinioController],
  exports: [MinioService],
})
export class MinioModule {}
