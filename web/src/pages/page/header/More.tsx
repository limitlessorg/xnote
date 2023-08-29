import { Divider, Switch } from 'antd'
import React from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import {
  RiArrowGoBackLine,
  RiLinksLine,
  RiLockLine,
  RiStarLine
} from 'react-icons/ri'
import { useNavigate } from 'react-router'

/**
 * 顶部右侧工具栏--更多
 * @returns
 */
const ToolbarMore: React.FC = () => {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }
  return (
    <div className="w-48">
      <div>
        <div>字体</div>
      </div>
      <Divider className="m-1" />
      <div className="flex justify-between p-1">
        <div>小字体</div>
        <div>
          <Switch size="small" defaultChecked />
        </div>
      </div>
      <Divider className="m-1" />
      <div className="flex cursor-pointer">
        <div className="text-base">
          <RiLockLine />
        </div>
        <div className="pl-2">锁定页面</div>
      </div>
      <Divider className="m-1" />
      <div className="flex cursor-pointer">
        <div className="text-base">
          <RiStarLine />
        </div>
        <div className="pl-2">收藏</div>
      </div>
      <div className="flex cursor-pointer pt-1">
        <div className="text-base">
          <RiLinksLine />
        </div>
        <div className="pl-2">复制链接</div>
      </div>
      <Divider className="m-1" />
      <div className="flex cursor-pointer">
        <div className="text-base">
          <RiArrowGoBackLine />
        </div>
        <div className="pl-2">回退</div>
      </div>
      <Divider className="m-1" />
      <div className="flex cursor-pointer" onClick={() => logout()}>
        <div className="text-base">
          <AiOutlineLogout />
        </div>
        <div className="pl-2">退出登录</div>
      </div>
    </div>
  )
}
export default ToolbarMore
