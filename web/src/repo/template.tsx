import http from './http'
import { Template, CreateTemplate } from 'models/template'

/**
 * 创建分享
 */
export function createTemplate(template: CreateTemplate) {
  return http.post(`template/create`, template)
}

/**
 * 查找分享列表
 */
export function findManyTemplate(where: any = {}): Promise<Template[]> {
  return http.post(`template/findMany`, where)
}

/**
 * 查找单个分享
 */
export function findOneTemplate(id: string): Promise<Template> {
  return http.get(`template/${id}`)
}

/**
 * 搜索分享列表
 */
export function searchTemplate(
  value: string,
  category: string
): Promise<Template[]> {
  category = category || 'all'
  return http.post(`template/search/${category}`, { value })
}
