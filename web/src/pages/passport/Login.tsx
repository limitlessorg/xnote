import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Tabs, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAppData, login } from 'repo'
import useSpaceStore from 'store/space'

const PassportLogin: React.FC = () => {
  const navigate = useNavigate()
  const { space, setUser, setSpace, setSpaces } = useSpaceStore()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('expiresIn')
  }, [])

  // 登录
  const onFinish = async ({
    account,
    password
  }: {
    account: string
    password: string
  }) => {
    if (account && password) {
      setLoading(true)
      const body = { account, password }
      const res = await login(body)
      setLoading(false)
      if (res.token) {
        localStorage.setItem('token', res.token)
        const appData: any = await getAppData(space?.id)
        localStorage.setItem('token', appData.auth.token)
        localStorage.setItem('expiresIn', appData.auth.expiresIn)
        setUser(appData.user)
        setSpace(appData.space)
        setSpaces(appData.spaces)
        navigate('/page')
        message.success('登录成功！')
      } else {
        message.error('用户名或密码错误！')
      }
    } else {
      message.error('请输入用户名和密码！')
    }
  }

  return (
    <div>
      <Tabs
        size="large"
        items={[
          { label: <div className="px-4">密码登录</div>, key: 'password' }
          // { label: <div className="px-4">扫码登录</div>, key: 'qrcode' }
        ]}
      />
      <Form onFinish={onFinish}>
        <Form.Item
          name="account"
          rules={[{ required: true, message: '请输入手机号/邮箱/账号' }]}
        >
          <Input
            size="large"
            prefix={<UserOutlined rev={'default'} />}
            placeholder="请输入手机号/邮箱/账号"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined rev={'default'} />}
            placeholder="请输入密码"
          />
        </Form.Item>
        <Form.Item>
          <Button
            block
            loading={loading}
            type="primary"
            size="large"
            htmlType="submit"
          >
            登录
          </Button>
        </Form.Item>
        <Form.Item>
          <div className="flex justify-between">
            <Link to="/passport/register">注册用户</Link>
            {/* <Link to="/passport/forget">忘记密码</Link> */}
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}
export default PassportLogin
