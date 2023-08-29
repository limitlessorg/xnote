import { Menu } from 'antd'
import React from 'react'
import {
  RiDatabaseLine,
  RiGiftLine,
  RiGlobalLine,
  RiPriceTagLine
} from 'react-icons/ri'

/**
 * 逛一逛
 * @returns
 */
const Browse: React.FC = () => {
  const items = [
    { label: '前端', key: 'label', icon: <RiPriceTagLine /> },
    { label: '后端', key: 'theme', icon: <RiGiftLine /> },
    { label: '云原生', key: 'store', icon: <RiDatabaseLine /> },
    { label: '设计', key: 'language', icon: <RiGlobalLine /> }
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

export default Browse
