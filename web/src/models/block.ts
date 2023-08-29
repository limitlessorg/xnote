import { BlockType } from 'note/blocks'
import { Layout } from 'react-grid-layout'

/**
 * 块
 */
export type Block = {
  id: string
  blockType: BlockType
  content: any
  parentId?: string
  containerId?: string
  children: Block[]
  // 容器布局
  layout: Layout[]
  // 容器项
  items: Block[]
}

/**
 * 创建--块
 */
export type CreateBlock = {
  blockType: BlockType
  content?: any
  parentId?: string
  containerId?: string
  layout?: Layout[]
}

/**
 * 修改--块
 */
export type UpdateBlock = {
  id: string
  blockType?: BlockType
  content?: any
  parentId?: string
  containerId?: string
}
