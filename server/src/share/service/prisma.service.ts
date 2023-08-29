import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    // prisma 中间件
    this.$use(async (params, next) => {
      if (params.action === 'create') {
        if (!params.args.data.id) {
          params.args.data.id = nanoid();
        }
      }
      return next(params);
    });
  }
}
