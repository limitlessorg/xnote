import { Menu, MenuProps } from 'antd'
import React, { useState } from 'react'
import { AiOutlineTag } from 'react-icons/ai'
import { RiDatabaseLine, RiGiftLine, RiGlobalLine } from 'react-icons/ri'
import Label from './Label'

/**
 * 设置页
 * @returns
 */
const Setting: React.FC = () => {
  const [content, setContent] = useState<React.ReactNode>(<Label />)
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
      label: '标签',
      key: 'label',
      icon: <AiOutlineTag />,
      content: <Label />
    },
    { label: '主题', key: 'theme', icon: <RiGiftLine /> },
    { label: '存储', key: 'store', icon: <RiDatabaseLine /> },
    { label: '语言', key: 'language', icon: <RiGlobalLine /> }
  ]
  return (
    <div className="flex h-96">
      <div className="w-1/5">
        <Menu items={items} onClick={onClick} defaultSelectedKeys={['label']} />
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
