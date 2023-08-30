import { Space } from 'models/space'
import http from './http'

/**
 * 创建空间
 */
export function createSpace(space: Space) {
  return http.post(`space/create`, space)
}

/**
 * 修改信息
 */
export function patchSpace(space: Space) {
  return http.patch(`space`, space)
}
