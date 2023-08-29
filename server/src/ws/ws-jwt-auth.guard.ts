import { AuthService } from 'src/auth/auth.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

/**
 * WebSocket 守卫
 * 校验token
 */
@Injectable()
export class WsJwtAuthGuard implements CanActivate {
  constructor(private authSrv: AuthService) {}

  canActivate(context: ExecutionContext) {
    const client = context.switchToWs().getClient();
    return this.validateClient(client);
  }

  validateClient(client): boolean {
    const token = client.protocol;
    const result = this.authSrv.verify(token);
    const curTime: number = new Date().getTime();
    if (result.iat * 1000 < curTime && curTime < result.exp * 1000) {
      client.space = result;
      return true;
    } else {
      return false;
    }
  }
}
