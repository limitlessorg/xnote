import React from 'react'
import { Outlet } from 'react-router-dom'
import useSettingStore from 'store/setting'

/**
 * 登录、注册页布局
 */
const PassportLayout: React.FC = () => {
  const { theme } = useSettingStore()
  return (
    <div className="flex h-full w-full justify-center">
      <div className="w-72 pt-28">
        <div className="flex justify-center">
          <h1 style={{ color: theme.colorPrimary }}>XNote 笔记</h1>
        </div>
        <Outlet />
      </div>
    </div>
  )
}
export default PassportLayout
