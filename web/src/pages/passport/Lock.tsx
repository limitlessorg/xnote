import { LockOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import React from 'react'

// TODO 锁屏：获取用户账户和头像，填写密码登录
const PassportLock: React.FC = () => {
  return (
    <div>
      <Form
        onFinish={async ({ password }) => {
          // const account = userCtrl.user.target.code
          // if (password && (await userCtrl.login(account, password))) {
          //   history.back()
          // }
        }}
      >
        <Form.Item></Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined rev={'default'} />}
            placeholder="请输入锁屏密码"
          />
        </Form.Item>
        <Form.Item>
          <Button size="large" block type="primary" htmlType="submit">
            解锁
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default PassportLock
