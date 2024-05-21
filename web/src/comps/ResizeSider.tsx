import { theme } from 'antd'
import { Resizable } from 're-resizable'
import React from 'react'
import useSettingStore from 'store/setting'

interface IResizeSiderProps {
  minWidth?: number
  maxWidth?: number
  children: React.ReactNode
}

/**
 * 可伸缩侧边栏
 */
const ResizeSider: React.FC<IResizeSiderProps> = ({
  minWidth = 200,
  maxWidth = 900,
  children
}) => {
  const { collapsed, headerHeight, siderWidth, setSiderWidth } =
    useSettingStore()

  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <>
      {!collapsed && (
        <Resizable
          minWidth={minWidth}
          maxWidth={maxWidth}
          defaultSize={{
            width: siderWidth,
            height: `calc(100vh - ${headerHeight}px)`
          }}
          enable={{ right: true }}
          onResizeStop={(e, direction, ref, d) => {
            setSiderWidth(siderWidth + d.width)
          }}
        >
          <div
            style={{ backgroundColor: colorBgContainer }}
            className="h-full w-full"
          >
            {children}
          </div>
        </Resizable>
      )}
    </>
  )
}

export default ResizeSider
