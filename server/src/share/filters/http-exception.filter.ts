import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

/**
 * 过滤器
 * 全局异常处理
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const message = exception.message;
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    Logger.log('错误提示', message);

    response
      .status(status)
      .header('Content-Type', 'application/json; charset=utf-8')
      .json({
        code: status,
        data: {
          error: message,
        },
        msg: '请求错误',
        success: false,
      });
  }
}
