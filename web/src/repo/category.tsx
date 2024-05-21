import http from './http'

/**
 * 获取类别项
 */
export function getCategoryOptions() {
  return http.get(`category/getOptions`)
}
