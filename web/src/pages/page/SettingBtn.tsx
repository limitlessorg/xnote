import { SettingOutlined } from '@ant-design/icons'
import { Button, Modal, Tooltip } from 'antd'
import Setting from 'modals/setting'
import React, { useState } from 'react'

const SettingBtn: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <>
      <Tooltip title="打开设置" placement="bottom" mouseLeaveDelay={0}>
        <div className="m-2">
          <Button
            type="text"
            size="large"
            icon={<SettingOutlined rev={undefined} />}
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </Tooltip>
      <Modal
        title="设置"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
        maskClosable={false}
        width={800}
        footer={null}
      >
        <Setting />
      </Modal>
    </>
  )
}

export default SettingBtn
