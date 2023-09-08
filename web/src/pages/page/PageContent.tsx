import { useDebounceFn } from '@ant-design/pro-utils'
import { Input, Segmented } from 'antd'
import { Block, CreateBlock } from 'models/block'
import React, { useEffect, useState } from 'react'
import GridLayout, { Layout } from 'react-grid-layout'
import { useParams } from 'react-router-dom'
import { useDebounce } from 'react-use'
import {
  createBlock,
  delBlock,
  findOne,
  updateBlock,
  updateLayout
} from 'repo/block'
import useSettingStore from 'store/setting'
import BlockItem from 'note/components/BlockItem'
import CreateBy from 'note/components/CreateBy'
import PageHeader from 'note/components/PageHeader'
import { BlockType } from 'note/blocks'
import { rowHeight } from 'note'

/**
 * 页面--内容
 */
const PageContent: React.FC = () => {
  const { id } = useParams()
  const [layouting, setLayouting] = useState(false)
  const { collapsed, siderWidth } = useSettingStore()
  const [page, setPage] = useState<Block>()
  const [layout, setLayout] = useState<Layout[]>([])
  const [items, setItems] = useState<Block[]>([])

  const init = async (id: string) => {
    const block = await findOne(id)
    setPage(block)
    setLayout(block.layout || [])
    setItems(block.items)
  }

  useEffect(() => {
    init(id as string)
  }, [id])

  /**
   * 插入块
   */
  const insertBlock = async (preBlock: Block) => {
    const b: CreateBlock = {
      blockType: BlockType.Text,
      containerId: id
    }
    const newBlock = await createBlock(b)
    const preBlockLayout = layout.find((item) => item.i == preBlock.id)
    let blockLayout: Layout = {
      i: newBlock.id,
      x: 0,
      y: 0,
      h: 1,
      w: 24
    }
    if (preBlockLayout) {
      blockLayout = { ...preBlockLayout, y: preBlockLayout.y + 1 }
    }

    const preBlockIndex = items.findIndex((item) => item.id === preBlock.id)
    const newContainerItems = [...items]
    newContainerItems.splice(preBlockIndex + 1, 0, newBlock)

    const newLayout = [...layout]
    newLayout.splice(preBlockIndex + 1, 0, blockLayout)

    setItems(newContainerItems)
    setLayout(newLayout)
  }

  /**
   * 删除块
   */
  const deleteBlock = (block: Block) => {
    console.log(block)
    delBlock(block.id).then((res) => {
      setItems(items.filter((i) => i.id !== block.id))
      console.log(res)
    })
  }

  // 更新去抖
  const { run } = useDebounceFn(updateBlock, 300)
  /**
   * 修改块内容
   */
  const onBlockChange = (block: Block): void => {
    run(block).then((res) => {
      setItems(
        items.map((item) => {
          if (item.id == block.id) {
            item = block
          }
          return item
        })
      )
    })
  }

  /**
   * 块高度变化
   */
  const blockHeightChange = (block: Block, h: number) => {
    const newLayout = (layout || []).map((item) => {
      if (item.i === block.id) {
        return { ...item, h: h, w: item.w == 1 ? 24 : item.w }
      } else {
        return item
      }
    })
    setLayout(newLayout)
  }

  useDebounce(
    () => updateLayout(id as string, layout).then((res) => console.log(res)),
    300,
    [layout]
  )

  // 创建最后一项
  const createLastBlockItem = () => {
    insertBlock(items[items.length - 1])
  }

  return (
    <div className="h-full w-full">
      <div className="py-4 px-8">
        <div className="flex justify-between">
          <div></div>
          <PageHeader block={page} />
          <div>
            <Segmented
              size="small"
              options={['编辑', '布局']}
              onChange={(value) => {
                setLayouting(value == '布局')
              }}
            />
          </div>
        </div>
        <GridLayout
          layout={layout}
          rowHeight={rowHeight}
          width={window.innerWidth - (collapsed ? 0 : siderWidth) - 48}
          margin={[0, 0]}
          cols={24}
          onLayoutChange={setLayout}
          resizeHandles={['se']}
          autoSize={true}
          verticalCompact={true}
          isResizable={layouting}
          isDroppable={layouting}
          isDraggable={layouting}
          isBounded={true}
        >
          {items.map((block, index) => {
            return (
              <div key={block.id}>
                <BlockItem
                  index={index}
                  block={block}
                  editable={true}
                  insertBlock={insertBlock}
                  deleteBlock={deleteBlock}
                  onBlockChange={onBlockChange}
                  onHeightChange={(height) => {
                    const h =
                      Math.floor(height / rowHeight) +
                      (height % rowHeight == 0 ? 0 : 1)
                    blockHeightChange(block, h)
                  }}
                />
              </div>
            )
          })}
        </GridLayout>
        {items.length == 0 && (
          <Input
            bordered={false}
            size="large"
            placeholder="按回车开始编辑，或从下方选择"
            onFocus={createLastBlockItem}
          />
        )}
        {items.length == 0 && <CreateBy />}
        <div className="h-32 cursor-text" onClick={createLastBlockItem}></div>
      </div>
    </div>
  )
}

export default PageContent
