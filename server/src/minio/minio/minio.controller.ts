import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Payload } from 'src/interface';
import { ReqPayload } from 'src/share/decorators/space.decorator';
import { MinioService } from './minio.service';
import { SkipAuthGuard } from 'src/share/decorators/skip-guard.decorator';

@Controller('oss')
export class MinioController {
  constructor(private readonly minioSrv: MinioService) {}

  /**
   * 上传文件
   * @param file 上传的文件
   * @param res 上传结果
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file, @ReqPayload() payload: Payload) {
    return this.minioSrv.putObject(file, payload);
  }

  /**
   * 获取文件
   * @param file 上传的文件
   * @param res 上传结果
   */
  @Get('/:bucket/:id')
  @SkipAuthGuard()
  async get(
    @Param('bucket') bucket: string,
    @Param('id') id: string,
    @Res() res: any,
  ) {
    const fileStream = await this.minioSrv.getObject(bucket, id);
    fileStream.pipe(res);
  }
}
