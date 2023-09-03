import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

// 不鉴权的接口
const OEPN_API = [
  '/api/auth/login', // 登录
  '/api/auth/register', // 注册
];

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    // 登录跳过
    if (OEPN_API.includes(request.url)) {
      return true;
    }
    // 跳过守卫
    const skipGuard = this.reflector.get<boolean>(
      'skipGuard',
      context.getHandler(),
    );
    if (skipGuard) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
