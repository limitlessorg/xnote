import { DataNode } from 'types'
import { create } from 'zustand'

export interface IBreadcrumbStoreProps {
  nodes: DataNode[]
  setNodes: (breadcrumbs: DataNode[]) => void
}

/**
 * 状态管理-面包屑
 */
const useBreadcrumbStore = create<IBreadcrumbStoreProps>()((set) => ({
  nodes: [],
  setNodes: (nodes: DataNode[]) => {
    set({ nodes })
  }
}))

export default useBreadcrumbStore
