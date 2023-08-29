/* eslint-disable @typescript-eslint/ban-types */
import { MenuProps } from 'antd'
import { ItemType as AntdItemType } from 'antd/es/menu/hooks/useItems'
import { DataNode as AntdDataNode } from 'antd/es/tree'

/**
 * 菜单项
 */
export type ItemType<T = {}> = AntdItemType & {
  operation: (item: T) => void
}

/**
 * 树节点
 */
export type DataNode<T = {}> = AntdDataNode & {
  item: T
  path: string
  operations: MenuProps['items']
  logo?: string
  icon?: string
  tags?: React.ReactNode[]
  badge?: number
  children: DataNode[]
}
