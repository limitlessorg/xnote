import { useQueryClient } from '@tanstack/react-query'
import { Button, Form, Input, Modal, Select, UploadProps, message } from 'antd'
import { UploadChangeParam, UploadFile } from 'antd/es/upload'
import UploadLogo from 'comps/UploadLogo'
import { Space } from 'models/space'
import React, { useState } from 'react'
import { createSpace, getAppData } from 'repo'
import useSpaceStore from 'store/space'

export type CreateSpaceModalProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

/**
 * 创建工作空间
 */
const CreateSpaceModal: React.FC<CreateSpaceModalProps> = ({
  open,
  setOpen
}) => {
  const [logo, setLogo] = useState<string>()
  const queryClient = useQueryClient()
  const { setUser, setSpace, setSpaces } = useSpaceStore()

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === 'uploading') {
      return
    }
    if (info.file.status === 'done') {
      setLogo(info.file.response?.data?.url)
    }
  }

  const onFinish = async (space: Space) => {
    space = { ...space, logo }
    const newSpace = await createSpace(space)
    if (newSpace) {
      message.success('创建成功!')
      setOpen(false)
      // 1、重新获取应用信息
      const appData: any = await getAppData(newSpace.id)
      localStorage.setItem('token', appData.auth.token)
      setUser(appData.user)
      setSpace(appData.space)
      setSpaces(appData.spaces)
      // 2、清除Queries缓存
      queryClient.invalidateQueries()
    }
  }

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
    >
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item label="空间图标" name="logo">
          <UploadLogo logo={logo} handleChange={handleChange} />
        </Form.Item>
        <Form.Item
          label="空间名称"
          name="name"
          rules={[{ required: true, message: '请输入空间名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="空间类型"
          name="spaceType"
          rules={[{ required: true, message: '请输入空间类型' }]}
        >
          <Select
            options={[
              { value: 'personal', label: '个人空间' },
              { value: 'team', label: '团队空间' }
            ]}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 21, span: 3 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateSpaceModal
