import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma.service';

@Injectable()
export class BlockService {
  constructor(private readonly prismaSrv: PrismaService) {}
}
