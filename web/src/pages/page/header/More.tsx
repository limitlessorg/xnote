import { Button, Divider } from 'antd'
import PublishModal from 'modals/PublishModal'
import React, { useState } from 'react'
import {
  AiOutlineLogout,
  AiOutlineSend,
  AiOutlineShareAlt
} from 'react-icons/ai'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom'

/**
 * 顶部右侧工具栏--更多
 * @returns
 */
const ToolbarMore: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [openPublish, setOpenPublish] = useState(false)

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }
  return (
    <>
      <div className="w-40">
        {id && (
          <>
            <Button
              type="text"
              block
              icon={<AiOutlineShareAlt />}
              className="text-left"
            >
              分享链接
            </Button>

            <Divider className="m-1" />
            <Button
              type="text"
              block
              icon={<AiOutlineSend />}
              onClick={() => setOpenPublish(true)}
              className="text-left"
            >
              发布页面
            </Button>
            <Divider className="m-1" />
          </>
        )}
        <Button
          type="text"
          block
          icon={<AiOutlineLogout />}
          onClick={() => logout()}
          className="text-left"
        >
          退出登录
        </Button>
      </div>
      <PublishModal open={openPublish} setOpen={setOpenPublish} />
    </>
  )
}
export default ToolbarMore
