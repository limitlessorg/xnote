import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/share/service/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaSrv: PrismaService) {}
}
