import { Avatar, Popover, Tabs, Tooltip } from 'antd'
import React from 'react'
import {
  AiOutlineCalendar,
  AiOutlineCheckSquare,
  AiOutlineFile,
  AiOutlineNumber,
  AiOutlineUser,
  AiOutlineUserSwitch
} from 'react-icons/ai'
import {
  RiFunctions,
  RiLink,
  RiListCheck2,
  RiListUnordered,
  RiLoaderLine,
  RiMailLine,
  RiNumber0,
  RiOrganizationChart,
  RiPhoneLine,
  RiText
} from 'react-icons/ri'
import Emoji from './Emoji'

const iconMap: Record<string, React.ReactNode> = {
  text: <RiText />,
  number: <AiOutlineNumber />,
  select: <RiListUnordered />,
  multiSelect: <RiListCheck2 />,
  status: <RiLoaderLine />,
  dateTime: <AiOutlineCalendar />,
  person: <AiOutlineUser />,
  file: <AiOutlineFile />,
  checkbox: <AiOutlineCheckSquare />,
  link: <RiLink />,
  email: <RiMailLine />,
  phone: <RiPhoneLine />,
  formula: <RiFunctions />,
  relation: <AiOutlineUserSwitch />,
  createTime: <RiNumber0 />,
  createdBy: <RiNumber0 />,
  modifiedTime: <RiNumber0 />,
  modifiedBy: <RiNumber0 />,
  org: <RiOrganizationChart />
}

export type IconProps = {
  icon: string | React.ReactNode
  readonly?: boolean
  onSelect?: (icon: string) => void
}

/**
 * 表情、图片、图标、自定义
 */
const Icon: React.FC<IconProps> = ({ icon, readonly = true, onSelect }) => {
  let iconfont: React.ReactNode | string = icon
  const reg = /[\ud800-\udbff][\udc00-\udfff]/g
  if (typeof icon === 'string') {
    if (icon.includes('/oss')) {
      iconfont = <Avatar size={18} src={icon} shape="square" />
    } else if (!reg.test(icon)) {
      iconfont = iconMap[icon]
    }
  }

  const items = [
    {
      key: 'emojis',
      label: '表情',
      children: <Emoji onSelect={onSelect} />
    },
    {
      key: 'icon',
      label: '图标',
      children: <div>图标(待开发。。。)</div>
    },
    {
      key: 'custom',
      label: '自定义',
      children: <div>自定义(待开发。。。)</div>
    }
  ]

  return (
    <>
      {readonly && <div>{iconfont}</div>}
      {!readonly && (
        <Popover
          trigger={['click', 'contextMenu']}
          content={<Tabs items={items} />}
          showArrow={false}
        >
          <div>
            <Tooltip title="更换图标" placement="bottom" mouseLeaveDelay={0}>
              <div>{iconfont}</div>
            </Tooltip>
          </div>
        </Popover>
      )}
    </>
  )
}

export default Icon
