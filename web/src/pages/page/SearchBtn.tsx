import { Modal, Tooltip } from 'antd'
import Search from 'modals/Search'
import React, { useState } from 'react'
import { RiSearchLine } from 'react-icons/ri'

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
        <div
          className="m-3 flex cursor-pointer select-none rounded p-1 px-2 hover:bg-neutral-200"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="text-xl">
            <RiSearchLine />
          </div>
        </div>
      </Tooltip>
      <Modal
        title="搜索"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
        maskClosable={false}
        width={850}
        footer={null}
      >
        <Search />
      </Modal>
    </>
  )
}

export default SearchBtn
