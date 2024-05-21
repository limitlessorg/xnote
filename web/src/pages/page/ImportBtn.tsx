import { ImportOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import ImportModal from 'modals/ImportModal'
import React, { useState } from 'react'

const ImportBtn: React.FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Tooltip title="导入文件" placement="bottom" mouseLeaveDelay={0}>
        <div className="m-2">
          <Button
            type="text"
            size="large"
            icon={<ImportOutlined rev={undefined} />}
            onClick={() => setOpen(true)}
          />
        </div>
      </Tooltip>
      <ImportModal open={open} setOpen={setOpen} />
    </>
  )
}

export default ImportBtn
