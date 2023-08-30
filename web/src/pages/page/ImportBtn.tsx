import { ImportOutlined } from '@ant-design/icons'
import { Button, Modal, Tooltip } from 'antd'
import Import from 'modals/Import'
import React, { useState } from 'react'

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
        <div className="m-2">
          <Button
            type="text"
            size="large"
            icon={<ImportOutlined rev={undefined} />}
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </Tooltip>
      <Modal
        title="导入"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
        maskClosable={false}
        width={700}
        footer={null}
      >
        <Import />
      </Modal>
    </>
  )
}

export default ImportBtn
