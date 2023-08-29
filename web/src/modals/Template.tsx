import { Menu } from 'antd'
import React from 'react'
import {
  RiDatabaseLine,
  RiGiftLine,
  RiGlobalLine,
  RiPriceTagLine
} from 'react-icons/ri'

/**
 * 模板库
 * @returns
 */
const Template: React.FC = () => {
  const items = [
    { label: '精选推荐', key: 'label', icon: <RiPriceTagLine /> },
    { label: '工作', key: 'theme', icon: <RiGiftLine /> },
    { label: '学习', key: 'store', icon: <RiDatabaseLine /> },
    { label: '游戏', key: 'language', icon: <RiGlobalLine /> }
  ]
  return (
    <div className="flex h-96">
      <div className="w-1/5">
        <Menu items={items} />
      </div>
      <div className="w-4/5">
        <div className="p-1 text-xl text-neutral-500">待设计开发...</div>
      </div>
    </div>
  )
}

export default Template
