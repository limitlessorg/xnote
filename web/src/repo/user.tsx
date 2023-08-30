import { User } from 'models/user'
import http from './http'

/**
 * 获取用户信息
 */
export function getUser(id: string) {
  return http.get(`user/${id}`)
}

/**
 * 修改信息
 */
export function patchUser(user: User) {
  return http.patch(`user`, user)
}
