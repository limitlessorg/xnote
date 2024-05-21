import { Block } from './block'
import { User } from './user'

/**
 * 创建模板
 */
export type CreateTemplate = {
  blockId: string
  category: string
  description?: string
}

/**
 * 发布模板
 */
export type Template = {
  id?: string
  blockId: string
  block: Block
  userId: string
  user: User
  title: string
  category: string
  updatedAt: Date
  description?: string
}
