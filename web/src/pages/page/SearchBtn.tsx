import { SearchOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import SearchModal from 'modals/SearchModal'
import React, { useState } from 'react'

/**
 * 搜索按钮
 */
const SearchBtn: React.FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Tooltip title="搜索页面" placement="bottom" mouseLeaveDelay={0}>
        <div className="m-2">
          <Button
            type="text"
            size="large"
            icon={<SearchOutlined rev={undefined} />}
            onClick={() => setOpen(true)}
          />
        </div>
      </Tooltip>
      <SearchModal open={open} setOpen={setOpen} />
    </>
  )
}

export default SearchBtn
