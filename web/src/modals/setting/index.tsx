import { Menu, MenuProps } from 'antd'
import React, { useState } from 'react'
import { RiDatabaseLine, RiGiftLine, RiGlobalLine } from 'react-icons/ri'
import PersonSetting from './PersonSetting'
import { UserOutlined, TeamOutlined } from '@ant-design/icons'
import ThemeSetting from './ThemeSetting'

/**
 * 设置页
 * @returns
 */
const Setting: React.FC = () => {
  const [content, setContent] = useState<React.ReactNode>(<PersonSetting />)
  const onClick: MenuProps['onClick'] = (e) => {
    const c = items.find((i) => i.key === e.key)
    if (c && c.content) {
      setContent(c.content)
    } else {
      setContent(null)
    }
  }
  const items = [
    {
      label: '个人',
      key: 'person',
      icon: <UserOutlined rev={undefined} />,
      content: <PersonSetting />
    },
    {
      label: '空间',
      key: 'space',
      icon: <TeamOutlined rev={undefined} />,
      content: <PersonSetting />
    },
    {
      label: '主题',
      key: 'theme',
      icon: <RiGiftLine />,
      content: <ThemeSetting />
    },
    { label: '语言', key: 'language', icon: <RiGlobalLine /> },
    { label: '存储', key: 'store', icon: <RiDatabaseLine /> }
  ]
  return (
    <div className="flex" style={{ height: 480 }}>
      <div className="w-1/5">
        <Menu
          items={items}
          onClick={onClick}
          defaultSelectedKeys={['person']}
        />
      </div>
      <div className="w-4/5">
        {content}
        {!content && (
          <div className="p-1 text-xl text-neutral-500">待设计开发...</div>
        )}
      </div>
    </div>
  )
}

export default Setting
