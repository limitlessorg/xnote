import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * 请求载荷信息装饰器
 */
export const ReqPayload = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
