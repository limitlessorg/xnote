import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Payload } from './const/biz.const';
import { ReqPayload } from './share/decorators/space.decorator';

@Controller()
export class AppController {
  constructor(private readonly appSrv: AppService) {}

  /**
   * 获取应用数据
   * @param payload Token载荷信息
   * @returns
   */
  @Post('getAppData')
  getAppData(
    @ReqPayload() payload: Payload,
    @Body() body: { spaceId?: string },
  ) {
    return this.appSrv.getAppData(payload, body.spaceId);
  }
}
