import { Modal, Tabs } from 'antd'
import React from 'react'
import { RiBuilding2Line, RiBuilding4Line } from 'react-icons/ri'
import { TeamOutlined } from '@ant-design/icons'

export type CreateSpaceModalProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

/**
 * 创建工作空间(Team和Corporation)
 */
const CreateSpaceModal: React.FC<CreateSpaceModalProps> = ({
  open,
  setOpen
}) => {
  return (
    <Modal
      title="创建"
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      destroyOnClose={true}
      maskClosable={false}
      width={550}
      footer={null}
    ></Modal>
  )
}

export default CreateSpaceModal
