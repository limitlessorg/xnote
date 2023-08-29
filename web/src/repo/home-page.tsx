import http from './http'

/**
 * 查找主页
 */
export function getHomePage() {
  return http.get(`homepage`)
}

/**
 * 设置主页
 */
export function putHomePage(blockId: string) {
  return http.put(`homepage`, { blockId })
}
