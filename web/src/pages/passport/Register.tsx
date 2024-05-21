import { Button, Form, Input, message, Steps, Tabs } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const { Step } = Steps

const steps = ['账户验证', '填写信息']

const PassportRegister: React.FC = () => {
  const [current, setCurrent] = useState(0)
  const [body, setBody] = useState<any>()

  // 注册
  const register = async (formValue: any) => {
    const body = { code: formValue.code, password: formValue.firstPassword }
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    const res = await response.json()
    if (res.success) {
      message.success('注册成功！')
    } else {
      message.error('注册失败！')
    }
  }

  return (
    <div>
      <Tabs
        size="large"
        items={[{ label: <div className="px-4">注册</div>, key: 'password' }]}
        className="py-4"
      />
      <div>
        <Form onFinish={register}>
          <Form.Item
            name="code"
            rules={[{ required: true, message: '请输入账号/邮箱/手机号' }]}
          >
            <Input size="large" placeholder="请输入账号/邮箱/手机号" />
          </Form.Item>
          <Form.Item
            name="firstPassword"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              size="large"
              placeholder="请输入密码(6-15位：包含大小写字母、数字和符号)"
            />
          </Form.Item>
          <Form.Item
            name="secondPassword"
            rules={[{ required: true, message: '请再次输入密码' }]}
          >
            <Input.Password size="large" placeholder="请再次输入密码" />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" size="large" htmlType="submit">
              注册
            </Button>
          </Form.Item>
          <div>
            <div></div>
            <div>
              已有账户?
              <Link to="/passport/login">返回登录</Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}
export default PassportRegister
