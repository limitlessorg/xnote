import { Card, Input, Modal } from 'antd'
import { Block } from 'models/block'
import { BlockType } from 'note/blocks'
import BlockItemContent from 'note/components/BlockItemContent'
import React, { useState } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { useDebounce } from 'react-use'
import { searchBlock } from 'repo'

type SearchModalProps = {
  open: boolean
  setOpen: (open: boolean) => void
  callback?: () => void
}

/**
 * 搜索
 * @returns
 */
const SearchModal: React.FC<SearchModalProps> = ({
  open,
  setOpen,
  callback
}) => {
  const navigate = useNavigate()
  const [value, setValue] = useState<string>('')
  const [blocks, setBlocks] = useState<Block[]>([])

  useDebounce(
    () => {
      if (value && value.trim().length > 0) {
        searchBlock(value).then((res) => {
          setBlocks(res || [])
        })
      }
    },
    200,
    [value]
  )
  // 页面跳转
  const nav = (block: Block) => {
    if (block.blockType == BlockType.Page) {
      navigate(`/page/${block.id}`)
    } else {
      // 单容器
      if (block.container && block.container.length > 0) {
        navigate(`/page/${block.container[0]?.id}`)
      }
    }
    if (callback) {
      callback()
    }
  }

  return (
    <Modal
      title="搜索"
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      destroyOnClose={true}
      maskClosable={false}
      width={650}
      footer={null}
    >
      <div
        className="overflow-y-hidden hover:overflow-y-auto"
        style={{ height: '520px' }}
      >
        <div>
          <Input
            prefix={<RiSearchLine />}
            placeholder="搜索内容：请输入关键字"
            size="large"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="rounded-2xl"
          />
        </div>

        {blocks.map((block) => {
          return (
            <Card
              key={block.id}
              className="my-2 cursor-pointer"
              bodyStyle={{ padding: '8px' }}
              onClick={() => nav(block)}
            >
              <BlockItemContent
                block={block}
                editable={false}
                onBlockChange={() => console.log()}
              />
            </Card>
          )
        })}
      </div>
    </Modal>
  )
}

export default SearchModal
