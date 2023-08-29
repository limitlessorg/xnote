import { Modal, Tooltip } from 'antd'
import Setting from 'modals/Setting'
import React, { useState } from 'react'
import { RiSettings3Line } from 'react-icons/ri'

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
        <div
          className="m-3 flex cursor-pointer select-none rounded p-1 px-2 hover:bg-neutral-200"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="text-xl">
            <RiSettings3Line />
          </div>
        </div>
      </Tooltip>
      <Modal
        title="设置"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
        maskClosable={false}
        width={850}
        footer={null}
      >
        <Setting />
      </Modal>
    </>
  )
}

export default SettingBtn
