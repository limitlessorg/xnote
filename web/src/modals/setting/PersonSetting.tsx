import { PlusOutlined } from '@ant-design/icons'
import {
  Avatar,
  Button,
  Form,
  Input,
  Upload,
  UploadFile,
  UploadProps,
  message
} from 'antd'
import ImgCrop from 'antd-img-crop'
import { RcFile, UploadChangeParam } from 'antd/es/upload'
import { User } from 'models/user'
import React, { useEffect, useRef, useState } from 'react'
import { patchUser } from 'repo'
import useSpaceStore from 'store/space'
import { DEFAULT_OSS_URL } from 'types'

/**
 * 个人设置
 */
const PersonSetting: React.FC = () => {
  const { user, setUser } = useSpaceStore()
  const [logo, setLogo] = useState()
  const [form] = Form.useForm()
  const formRef = useRef(null)

  useEffect(() => {
    if (formRef.current) {
      form.setFieldsValue(user)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form])

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === 'uploading') {
      return
    }
    if (info.file.status === 'done') {
      console.log(
        'info.file.response?.data?.url',
        info.file.response?.data?.url
      )
      setLogo(info.file.response?.data?.url)
      form.setFieldValue('logo', info.file.response?.data?.url)
    }
  }

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('只能上传 JPG或者PNG 格式的图片!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('图片必须小于 2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  const onFinish = () => {
    patchUser(form.getFieldsValue()).then((user: User) => {
      setUser(user)
      message.success('修改成功')
    })
  }
  return (
    <Form
      onFinish={onFinish}
      form={form}
      labelCol={{ span: 4 }}
      layout="horizontal"
      ref={formRef}
      initialValues={user}
    >
      <Form.Item label="头像" name="logo">
        <ImgCrop rotationSlider>
          <Upload
            name="file"
            listType="picture-circle"
            showUploadList={false}
            action={DEFAULT_OSS_URL}
            headers={{ token: localStorage.getItem('token') as string }}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {logo || user?.logo ? (
              <Avatar src={logo || user?.logo} alt="avatar" size={102} />
            ) : (
              <div>
                <PlusOutlined rev={'default'} />
                <div>Logo</div>
              </div>
            )}
          </Upload>
        </ImgCrop>
      </Form.Item>
      <Form.Item label="名称" name="name" required>
        <Input />
      </Form.Item>
      <Form.Item label="手机号" name="phone">
        <Input />
      </Form.Item>
      <Form.Item label="邮箱" name="email">
        <Input />
      </Form.Item>
      <Form.Item label="个性签名" name="remark">
        <Input.TextArea />
      </Form.Item>
      <Form.Item className="text-right">
        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </Form.Item>
    </Form>
  )
}

export default PersonSetting
