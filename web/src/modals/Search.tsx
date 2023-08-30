import { Input } from 'antd'
import { Block } from 'models/block'
import React, { useState } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { useDebounce } from 'react-use'
import { searchBlock } from 'repo'

/**
 * 搜索
 * @returns
 */
const Search: React.FC = () => {
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

  return (
    <div className="h-96">
      <div>
        <Input
          prefix={<RiSearchLine />}
          size="large"
          placeholder="搜索内容：请输入关键字"
          style={{ width: 400 }}
          bordered={false}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      {blocks.map((block) => {
        return <div key={block.id}>{block.id}</div>
      })}
    </div>
  )
}

export default Search
