import { theme } from 'antd'
import React from 'react'
import useSettingStore from 'store/setting'

interface IResizeSiderProps {
  children: React.ReactNode
}

/**
 * 可伸缩内容容器
 */
const ResizeContent: React.FC<IResizeSiderProps> = ({ children }) => {
  const { collapsed, siderWidth, headerHeight } = useSettingStore()
  const width = collapsed ? 0 : siderWidth
  const borderLeft = collapsed ? undefined : '1px solid #ebeef5'

  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const style: React.CSSProperties = {
    width: `calc(100vw - ${width}px)`,
    borderLeft,
    backgroundColor: colorBgContainer,
    height: `calc(100vh - ${headerHeight}px)`
  }

  return (
    <div style={style} className="overflow-y-hidden hover:overflow-y-auto">
      {children}
    </div>
  )
}

export default ResizeContent
