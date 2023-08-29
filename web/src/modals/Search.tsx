import { Input } from 'antd'
import React, { useState } from 'react'
import { RiSearchLine } from 'react-icons/ri'

/**
 * 搜索
 * @returns
 */
const Search: React.FC = () => {
  const [result, setResult] = useState<any[]>([])

  return (
    <div className="h-96">
      <div>
        <Input
          prefix={<RiSearchLine />}
          size="large"
          placeholder="搜索内容：请输入关键字"
          style={{ width: 400 }}
          bordered={false}
          onChange={(e) => console.log(e.target.value)}
        />
      </div>
      {result.map((r) => {
        return <div key={r.id}>{r.name}</div>
      })}
    </div>
  )
}

export default Search
