/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable } from 'rxjs'
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'

/**
 * WebSocket 响应
 */
export type WsRes = {
  event: string
  data: any
}

/**
 * WebSocket
 */
export class WS {
  // 连接地址
  private url = `ws://${window.location.hostname}:3001`
  // 连接实例
  private webSocketSubject!: WebSocketSubject<any>
  // 发送者回调注册
  private wsSenderCallbackRegistry = new Map<string, (data: any) => void>()

  /**
   * 获取WebSocket链接状态
   * @returns
   */
  getWsStatus(): boolean {
    return !!this.webSocketSubject?.closed
  }

  /**
   * 连接WebSocket
   */
  private connect(): WebSocketSubject<any> {
    if (!this.webSocketSubject || this.webSocketSubject?.closed) {
      const token = localStorage.getItem('token') as string
      if (token && token.length > 16) {
        this.webSocketSubject = webSocket({
          url: this.url,
          protocol: token
        })
        this.webSocketSubject.subscribe((res) => {
          const callback = this.wsSenderCallbackRegistry.get(res.event)
          if (callback) {
            callback(res.data)
          }
        })
      }
    }
    return this.webSocketSubject
  }

  /**
   * 获取WebSocket订阅
   *
   * @param event 事件(相当于http的url)
   * @returns Observable<any>
   */
  ws(event: string): Observable<WsRes> {
    return this.connect().multiplex(
      () => {
        console.log(`已订阅:${event}`)
      },
      () => {
        console.log(`取消订阅:${event}`)
      },
      (res: WsRes) => res.event === event
    )
  }

  /**
   * 发送消息
   *
   * @param event 事件(相当于http的url)
   * @param data 相当于http的body)
   * @param callback 回调函数
   */
  send(event: string, data: any, callback?: (data: any) => void) {
    if (callback) {
      this.wsSenderCallbackRegistry.set(event, callback)
    }
    this.connect().next({ event, data })
  }

  /**
   * 取消订阅
   * @param event 事件
   */
  unsubscribe(event: string) {
    this.wsSenderCallbackRegistry.delete(event)
  }
}

const wsClient = new WS()

export default wsClient
