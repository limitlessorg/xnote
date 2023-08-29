import { Modal, Tooltip } from 'antd'
import Import from 'modals/Import'
import React, { useState } from 'react'
import { AiOutlineImport } from 'react-icons/ai'

const ImportBtn: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <>
      <Tooltip title="导入文件" placement="bottom" mouseLeaveDelay={0}>
        <div
          className="m-3 flex cursor-pointer select-none rounded p-1 px-2 hover:bg-neutral-200"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="text-xl">
            <AiOutlineImport />
          </div>
        </div>
      </Tooltip>
      <Modal
        title="导入"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
        maskClosable={false}
        width={650}
        footer={null}
      >
        <Import />
      </Modal>
    </>
  )
}

export default ImportBtn
