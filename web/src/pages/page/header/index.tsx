import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Divider, Tooltip } from 'antd'
import React from 'react'
import useSettingStore from 'store/setting'
import Breadcrumb from './Breadcrumb'
import Toolbar from './Toolbar'

/**
 * 头部(包含：面包屑、工具条等)
 */
const Header: React.FC = () => {
  const { collapsed, setCollapsed, siderWidth, headerHeight } =
    useSettingStore()

  const width = collapsed ? 0 : siderWidth
  const borderStyle = collapsed ? undefined : '1px solid #ebeef5'

  const style: React.CSSProperties = {
    width: `calc(100vw - ${width}px)`,
    height: headerHeight,
    borderLeft: borderStyle,
    borderBottom: borderStyle
  }
  return (
    <div className="flex justify-between" style={style}>
      <div className="flex cursor-pointer py-2">
        <Tooltip mouseLeaveDelay={0} mouseEnterDelay={0.5} placement="bottom">
          <a
            className="my-1 ml-3 rounded px-1 text-base hover:bg-neutral-200"
            onClick={() => setCollapsed(!collapsed)}
          >
            {!collapsed && <MenuFoldOutlined rev={'default'} />}
            {collapsed && <MenuUnfoldOutlined rev={'default'} />}
          </a>
        </Tooltip>
        <Divider type="vertical" className="mt-2 px-1" />
        <div className="py-1">
          <Breadcrumb />
        </div>
      </div>
      <div className="py-2">
        <Toolbar />
      </div>
    </div>
  )
}

export default Header
