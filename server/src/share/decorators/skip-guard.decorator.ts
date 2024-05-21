import { SetMetadata, CustomDecorator } from '@nestjs/common';

/**
 * 装饰器：跳过认证
 */
export const SkipAuthGuard = (): CustomDecorator<string> =>
  SetMetadata('skipGuard', true);
