import { Injectable } from '@nestjs/common';
import { OssFile } from '@prisma/client';
import { Client, UploadedObjectInfo } from 'minio';
import { nanoid } from 'nanoid';
import { Payload } from 'src/interface';
import { PrismaService } from 'src/share/service/prisma.service';
import internal from 'stream';

@Injectable()
export class MinioService {
  private readonly client: Client;

  constructor(private readonly prismaSrv: PrismaService) {
    this.client = new Client({
      endPoint: process.env.MINIO_ENDPOINT,
      port: +process.env.MINIO_PORT,
      useSSL: false,
      accessKey: process.env.ACCESS_KEY,
      secretKey: process.env.SECRET_KEY,
    });
  }

  /**
   * 上传文件
   * @param file 上传的文件
   * @returns OssFile
   */
  public async putObject(file: any, payload: Payload): Promise<OssFile> {
    const bucketName = process.env.DEFAULT_BUCKET;
    const key = `${nanoid()}${file.originalname.substring(
      file.originalname.lastIndexOf('.'),
    )}`;
    const result: UploadedObjectInfo = await this.client.putObject(
      bucketName,
      key,
      file.buffer,
    );
    const ossFile = {
      uid: key,
      size: file.size,
      name: file.originalname,
      filename: file.originalname,
      lastModifiedDate: new Date(),
      url: `/oss/${bucketName}/${key}`,
      thumbUrl: `/oss/${bucketName}/${key}`,
      status: 'done',
      error: JSON.stringify(result),
      userId: payload.userId,
      spaceId: payload.spaceId,
    };
    return this.prismaSrv.ossFile.create({
      data: ossFile,
    });
  }

  /**
   * 获取对象
   * @param bucket 存储桶名称
   * @param id 文件ID
   */
  public getObject(bucket: string, id: string): Promise<internal.Readable> {
    return this.client.getObject(bucket, id);
  }
}
