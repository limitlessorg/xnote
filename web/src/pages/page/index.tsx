import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Tree } from 'antd'
import { saveAs } from 'file-saver'
import { usePathKey } from 'hooks/usePath'
import { Block, CreateBlock } from 'models/block'
import ResizeContent from 'comps/ResizeContent'
import ResizeSider from 'comps/ResizeSider'
import Header from 'pages/page/header'
import { BlockType } from 'note/blocks'
import TitleRender from 'note/components/TitleRender'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import {
  createBlock,
  delBlock,
  findOne,
  treeBlock,
  updateLayout
} from 'repo/block'
import useBreadcrumbStore from 'store/breadcrumb'
import { DataNode } from 'types'
import CreatePageBtn from './CreatePageBtn'
import ImportBtn from './ImportBtn'
import SearchBtn from './SearchBtn'
import SettingBtn from './SettingBtn'
import WorkSpace from './WorkSpace'

const Page: React.FC = () => {
  const navigate = useNavigate()
  const [operationKey, setOperationKey] = useState<string>()
  const [node, setNode] = useState<DataNode>()
  const { lastPathKey } = usePathKey()
  const { setNodes } = useBreadcrumbStore()
  const queryClient = useQueryClient()

  // 合并查询
  const { data: nodes } = useQuery({
    queryKey: ['treeBlock'],
    queryFn: treeBlock
  })

  // 刷新面包屑
  useEffect(() => {
    setNodes(nodes || [])
  }, [nodes, setNodes])

  // 创建块
  const create = (parentBlock?: Block) => {
    const block: CreateBlock = {
      parentId: parentBlock?.id,
      blockType: BlockType.Page,
      content: {
        name: '新页面',
        icon: '📄'
      }
    }
    createBlock(block).then((blockItem: Block) => {
      queryClient.resetQueries(['treeBlock'])
      navigate(`/page/${blockItem.id}`)
      if (parentBlock) {
        layoutChange(parentBlock, blockItem)
      }
    })
  }

  /**
   * 修改布局
   * @param parentBlock 父块（容器）
   * @param blockItem 块
   */
  const layoutChange = (parentBlock: Block, blockItem: Block) => {
    let layout = parentBlock.layout || []
    let layoutItem = { x: 0, y: 0, w: 24, h: 1 }
    if (layout.length > 0) {
      layoutItem = layout.reduce((prev, current) => {
        return prev.y > current.y ? prev : current
      })
    }
    layout = [
      ...layout,
      { i: blockItem.id as string, x: 0, y: layoutItem.y, w: 24, h: 1 }
    ]
    if (parentBlock.id) {
      updateLayout(parentBlock.id, layout).then((res) => {
        console.log(res)
      })
    }
  }

  /**
   * 跳转
   * @param node 节点
   */
  const handleNodeClick = (node: DataNode<Block>) => {
    navigate(`${node.path}`)
  }

  /**
   * 节点操作
   * @param operationKey 操作Key
   * @param node 节点
   */
  const handleOperationClick = (
    operationKey: string,
    node: DataNode<Block>
  ) => {
    setOperationKey(operationKey)
    setNode(node)

    if (operationKey == 'CreateBlock') {
      create(node.item)
    } else if (operationKey == 'DeletePage') {
      delBlock(node.key as string).then((res) => {
        queryClient.resetQueries(['treeBlock'])
      })
    } else if (operationKey == 'ExportPage') {
      findOne(node.key as string).then((res) => {
        // 页面保存为JSON文件
        const blob = new Blob([JSON.stringify(res)], {
          type: 'text/plain;charset=utf-8'
        })
        saveAs(blob, `${node.title}.json`)
      })
    }
  }
  return (
    <div className="flex h-full w-full">
      <ResizeSider>
        <div className="flex h-full max-h-full w-full flex-col">
          <WorkSpace />
          <div className="flex pl-3">
            <SearchBtn />
            <ImportBtn />
            <SettingBtn />
            <CreatePageBtn click={create} />
          </div>
          <div
            className="overflow-y-hidden hover:overflow-y-auto"
            style={{
              height: `calc(100vh - ${152}px)`
            }}
          >
            <Tree
              className="rounded-none py-2"
              blockNode={true}
              treeData={nodes}
              selectedKeys={[lastPathKey]}
              draggable
              autoExpandParent={true}
              titleRender={(node) => (
                <TitleRender
                  node={node}
                  handleNodeClick={(node) => {
                    handleNodeClick(node as any)
                  }}
                  handleOperationClick={(operationKey, node) =>
                    handleOperationClick(operationKey, node.item as any)
                  }
                />
              )}
            />
          </div>
          <div>
            <Button type="text" block size="large">
              模板中心
            </Button>
          </div>
        </div>
      </ResizeSider>
      <div>
        <Header />
        <ResizeContent>
          <Outlet />
        </ResizeContent>
      </div>
    </div>
  )
}

export default Page
