import { TeamOutlined, UserOutlined } from '@ant-design/icons'
import { Menu, MenuProps, Modal } from 'antd'
import React, { useState } from 'react'
import { RiDatabaseLine, RiGiftLine, RiGlobalLine } from 'react-icons/ri'
import PersonSetting from './PersonSetting'
import SpaceSetting from './SpaceSetting'
import ThemeSetting from './ThemeSetting'

type SettingModalProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

/**
 * 设置页
 * @returns
 */
const SettingModal: React.FC<SettingModalProps> = ({ open, setOpen }) => {
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
      content: <SpaceSetting />
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
    <Modal
      title="设置"
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      destroyOnClose={true}
      maskClosable={false}
      width={800}
      footer={null}
    >
      <div className="flex" style={{ height: 520 }}>
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
    </Modal>
  )
}

export default SettingModal
