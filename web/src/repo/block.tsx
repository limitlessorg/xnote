import {
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  PlusOutlined
} from '@ant-design/icons'
import { CreateBlock, UpdateBlock } from 'models/block'
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
  return http.patch(`block/${block.id}`, block)
}

/**
 * 删除Block
 */
export function delBlock(id: string) {
  return http.delete(`block/${id}`)
}

/**
 * 修改Block布局
 */
export function updateLayout(id: string, layout: Layout[]) {
  return http.patch(`block/${id}`, { layout })
}

/**
 * 查找Block列表
 */
export function findManyBlock(where: any = {}) {
  return http.post(`block/findMany`, where)
}

/**
 * 查找单个Block
 */
export function findOneBlock(id: string) {
  return http.get(`block/${id}`)
}

/**
 * 搜索
 */
export function searchBlock(value: string) {
  return http.get(`block/search/${value}`)
}

/**
 * 查找Block树
 */
export function treeBlock() {
  return findManyBlock({ blockType: 'page' }).then((blocks) => {
    return arrToTreeNode(blocks, {
      cb: (item) => {
        item.path = `/page/${item.id}`
        item.item = item
        item.title = item.content?.name
        item.icon = item.content?.icon
        item.operations = [
          {
            key: 'CreateBlock',
            label: (
              <div className="flex">
                <div>
                  <PlusOutlined rev={undefined} />
                </div>
                <div className="pl-2">创建页面</div>
              </div>
            )
          },
          {
            key: 'ReName',
            label: (
              <div className="flex">
                <div>
                  <EditOutlined rev={undefined} />
                </div>
                <div className="pl-2">重命名</div>
              </div>
            )
          },
          {
            key: 'DeletePage',
            label: (
              <div className="flex">
                <div>
                  <DeleteOutlined rev={undefined} />
                </div>
                <div className="pl-2">删除</div>
              </div>
            )
          },
          {
            key: 'ExportPage',
            label: (
              <div className="flex">
                <div>
                  <ExportOutlined rev={undefined} />
                </div>
                <div className="pl-2">导出</div>
              </div>
            )
          }
        ]
      }
    })
  })
}
