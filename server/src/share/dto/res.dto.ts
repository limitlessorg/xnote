import { HttpStatus } from '@nestjs/common';

/**
 * 前后返回格式
 */
export class R {
  data: any;
  msg: string;
  success: boolean;
  code: HttpStatus = HttpStatus.OK;

  constructor(msg: string, success: boolean) {
    this.msg = msg;
    this.success = success;
    this.data = null;
  }

  static fail(msg: string) {
    return new R(msg, false);
  }
}
