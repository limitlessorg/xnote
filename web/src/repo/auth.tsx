import http from './http'

/**
 * 登录
 */
export function login(body: { account: string; password: string }) {
  return http.post(`auth/login`, body)
}

/**
 * 刷新token
 */
export function refreshToken() {
  return http.get(`auth/refresh`)
}

/**
 * 获取应用数据
 */
export function getAppData(spaceId?: string) {
  return http.post(`getAppData`, { spaceId })
}
