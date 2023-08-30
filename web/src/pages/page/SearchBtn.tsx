import { SearchOutlined } from '@ant-design/icons'
import { Button, Modal, Tooltip } from 'antd'
import Search from 'modals/Search'
import React, { useState } from 'react'

const SearchBtn: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <>
      <Tooltip title="搜索页面" placement="bottom" mouseLeaveDelay={0}>
        <div className="m-2">
          <Button
            type="text"
            size="large"
            icon={<SearchOutlined rev={undefined} />}
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </Tooltip>
      <Modal
        title="搜索"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
        maskClosable={false}
        width={700}
        footer={null}
      >
        <Search />
      </Modal>
    </>
  )
}

export default SearchBtn
