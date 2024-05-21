import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { WsGateway } from './ws-gateway';

@Module({
  imports: [AuthModule],
  providers: [WsGateway],
  exports: [WsGateway],
})
export class WsModule {}
