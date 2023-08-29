import { Block, CreateBlock, UpdateBlock } from 'models/block'
import { Layout } from 'react-grid-layout'
import { arrToTreeNode } from 'utils'
import http from './http'

/**
 * 创建Block
 */
export function createBlock(block: CreateBlock) {
  return http.post(`block/create`, block)
}

/**
 * 修改Block
 */
export function updateBlock(block: UpdateBlock) {
  return http.patch(`block/update/${block.id}`, block)
}

/**
 * 删除Block
 */
export function delBlock(id: string) {
  return http.delete(`block/delete/${id}`)
}

/**
 * 修改Block布局
 */
export function updateLayout(id: string, layout: Layout[]) {
  return http.patch(`block/update/${id}`, { layout })
}

/**
 * 查找Block列表
 */
export function findMany(where: any = {}) {
  return http.post(`block/findMany`, where)
}

/**
 * 查找单个Block
 */
export function findOne(id: string) {
  return http.get(`block/${id}`)
}

/**
 * 查找Block树
 */
export function treeBlock() {
  return findMany({ blockType: 'page' }).then((blocks) => {
    return arrToTreeNode(blocks, {
      cb: (item) => {
        item.path = `/page/${item.id}`
        item.item = item
        item.title = item.content?.name
        item.icon = item.content?.icon
        item.operations = [
          {
            key: 'CreateBlock',
            label: '创建'
          },
          {
            key: 'ReName',
            label: '重命名'
          },
          {
            key: 'DeletePage',
            label: '删除'
          },
          {
            key: 'ExportPage',
            label: '导出'
          }
        ]
      }
    })
  })
}

/**
 * 获取容器项
 * @param id 容器ID
 * @returns Block[]
 */
export function listContainerItems(id: string) {
  return http.get(`blockContainer/listContainerItems/${id}`)
}
