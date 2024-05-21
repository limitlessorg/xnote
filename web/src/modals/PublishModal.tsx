import { useQuery } from '@tanstack/react-query'
import { Button, Form, Input, Modal, Radio, Select, message } from 'antd'
import { CreateTemplate } from 'models/template'
import React from 'react'
import { useParams } from 'react-router-dom'
import { getCategoryOptions, createTemplate } from 'repo'

export type CreateSpaceModalProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

/**
 * 发布模板
 */
const PublishModal: React.FC<CreateSpaceModalProps> = ({ open, setOpen }) => {
  const { id: blockId } = useParams()
  const { data: categoryOptions } = useQuery({
    queryKey: ['getCategoryOptions'],
    queryFn: getCategoryOptions
  })

  const onFinish = async (template: CreateTemplate) => {
    const res = await createTemplate({
      ...template,
      blockId: blockId as string
    })
    if (res) {
      message.success('发布成功!')
      setOpen(false)
    }
  }

  return (
    <Modal
      title="发布页面"
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      destroyOnClose={true}
      maskClosable={false}
      width={550}
      footer={null}
    >
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          label="标题"
          name="title"
          rules={[{ required: true, message: '请输入标题' }]}
        >
          <Input placeholder="请输入标题" />
        </Form.Item>
        <Form.Item
          label="页面范围"
          name="scope"
          rules={[{ required: true, message: '请选择页面范围' }]}
        >
          <Radio.Group
            options={[
              { label: '当前页', value: 'CUR_PAGE' },
              { label: '包含子页', value: 'TREE_PAGE' }
            ]}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
        <Form.Item
          label="类别"
          name="category"
          rules={[{ required: true, message: '请输入类别' }]}
        >
          <Select placeholder="请选择类别" options={categoryOptions} />
        </Form.Item>
        <Form.Item label="描述" name="description">
          <Input.TextArea placeholder="请输入描述信息" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 21, span: 3 }}>
          <Button type="primary" htmlType="submit">
            发布
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default PublishModal
