import { useQueryClient } from '@tanstack/react-query'
import { Input } from 'antd'
import Icon from 'comps/Icon'
import { Block, UpdateBlock } from 'models/block'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDebounce } from 'react-use'
import { updateBlock } from 'repo'
import { BlockType } from '../blocks'

interface ICreateIndexProps {
  block?: Block
  readOnly?: boolean
}

/**
 * 创建引导
 */
const PageHeader: React.FC<ICreateIndexProps> = ({
  block,
  readOnly = false
}) => {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const [content, setContent] = useState<any>(block?.content)

  useEffect(() => {
    setContent(block?.content)
  }, [block])

  const update = () => {
    const newBlock: UpdateBlock = {
      id: id as string,
      blockType: BlockType.Page,
      content
    }
    updateBlock(newBlock).then((res) => {
      queryClient.resetQueries(['treeBlock'])
    })
  }

  useDebounce(() => update(), 500, [content])

  return (
    <div>
      <div className="flex">
        <div className="cursor-pointer pt-2 text-2xl">
          <Icon
            icon={content?.icon}
            onSelect={(e) => setContent({ ...content, icon: e })}
            readonly={readOnly}
          />
        </div>
        <Input
          className="text-3xl font-bold"
          size="large"
          value={content?.name}
          placeholder="新页面"
          bordered={false}
          onChange={(e) => setContent({ ...content, name: e.target.value })}
          onPressEnter={update}
          readOnly={readOnly}
        />
      </div>
    </div>
  )
}

export default PageHeader
