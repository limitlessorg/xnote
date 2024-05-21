import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * 返回格式转换-拦截器
 * Response 返回数据转换
 */
@Injectable()
export class TransformInterceptor<T, R> implements NestInterceptor<T, R> {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // 直接返回
        if (data && data.success !== undefined && data.msg !== undefined) {
          return data;
        }
        // 包装返回
        return {
          data,
          code: HttpStatus.OK,
          msg: '请求成功',
          success: true,
        };
      }),
    );
  }
}
