import { UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { AuthService } from 'src/auth/auth.service';
import { Server } from 'ws';
import { WsJwtAuthGuard } from './ws-jwt-auth.guard';

@WebSocketGateway(3001)
@UseGuards(WsJwtAuthGuard)
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  // 存放会话
  private map: Map<string, any> = new Map();
  constructor(private authSrv: AuthService) {}

  @WebSocketServer()
  server: Server;

  /**
   * 处理连接
   * @param client 客户端
   * @param args 参数
   */
  handleConnection(client: any, ...args: any[]) {
    const token = client.protocol;
    if (token && token.length > 16) {
      try {
        const result = this.authSrv.verify(token);
        const curTime: number = new Date().getTime();
        if (result.iat * 1000 < curTime && curTime < result.exp * 1000) {
          client.payload = result;
          this.map.set(result.userId, client);
        }
      } catch (error) {
        console.log(error);
      }
    }
    console.log(client, '已连接');
  }

  /**
   * 处理断开连接
   * @param client 客户端
   */
  handleDisconnect(client: any) {
    if (client.payload?.userId) {
      this.map.delete(client.payload?.userId);
    }
    console.log(client, '断开连接');
  }

  /**
   * 向所有客户端发布信息
   * @param event 事件
   * @param data 数据
   */
  public publish(event: string, data: any) {
    for (const client of this.server.clients.values()) {
      client.send(
        JSON.stringify({
          event,
          data,
        }),
      );
    }
  }

  /**
   * 向指定客户端发送信息
   * @param userId 用户ID
   * @param event 事件
   * @param data 数据
   */
  public send(userId: string, event: string, data: any) {
    const client = this.map.get(userId);
    if (client) {
      client.send(
        JSON.stringify({
          event,
          data,
        }),
      );
    }
  }
}
