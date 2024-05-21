import { SettingOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import SettingModal from 'modals/setting'
import React, { useState } from 'react'

const SettingBtn: React.FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Tooltip title="打开设置" placement="bottom" mouseLeaveDelay={0}>
        <div className="m-2">
          <Button
            type="text"
            size="large"
            icon={<SettingOutlined rev={undefined} />}
            onClick={() => setOpen(true)}
          />
        </div>
      </Tooltip>
      <SettingModal open={open} setOpen={setOpen} />
    </>
  )
}

export default SettingBtn
