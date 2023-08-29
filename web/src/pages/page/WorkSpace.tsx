import { PlusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { useQueryClient } from '@tanstack/react-query'
import { Avatar, Button, Divider, Popover, Row, Tag } from 'antd'
import CreateSpaceModal from 'modals/CreateSpaceModal'
import { useState } from 'react'
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri'
import { getAppData } from 'repo/auth'
import useSpaceStore, { Space, SpaceType, spaceTypeObject } from 'store/space'

/**
 * 空间
 */
const WorkSpace: React.FC = () => {
  const { space, spaces, setUser, setSpace, setSpaces } = useSpaceStore()
  const [open, setOpen] = useState(false)
  const [openCreate, setOpenCreate] = useState(false)
  const queryClient = useQueryClient()

  const items = spaces.filter((i) => i.spaceId !== space?.spaceId) || []

  // 切换工作空间
  const changeWorkSpace = async (s: Space) => {
    setOpen(false)
    // 1、重新获取空间应用数据
    const appData: any = await getAppData(s.spaceId)
    localStorage.setItem('token', appData.auth.token)
    setUser(appData.user)
    setSpace(appData.space)
    setSpaces(appData.spaces)
    // 2、清除Queries缓存
    queryClient.invalidateQueries()
    // navigate(`/home`)
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }

  // 创建
  const create = () => {
    setOpen(false)
    setOpenCreate(true)
  }

  const renderSpaceItem = (item: Space) => (
    <div key={item?.spaceId}>
      <Button
        size="large"
        type="text"
        block
        className="flex"
        onClick={() => changeWorkSpace(item)}
      >
        <div>
          <Avatar
            size="small"
            src={item.logo}
            shape={item.spaceType === SpaceType.User ? 'circle' : 'square'}
          />
        </div>
        <div className="px-1.5">
          <span className="pr-2">{item.name}</span>
          <Tag color="green">{spaceTypeObject[item.spaceType]}</Tag>
        </div>
      </Button>
    </div>
  )

  const renderContent = () => (
    <div className="w-44">
      {items.map(renderSpaceItem)}
      <Divider className="m-1" />
      <Row>
        <Button
          type="text"
          icon={<PlusCircleOutlined rev={'default'} />}
          block
          onClick={create}
        >
          创建
        </Button>
      </Row>
    </div>
  )

  return (
    <>
      <Popover
        content={renderContent}
        arrow={false}
        trigger={['click', 'contextMenu']}
        open={open}
        placement="bottomLeft"
        onOpenChange={handleOpenChange}
      >
        <div
          className="mx-4 my-3 flex cursor-pointer select-none text-left"
          onClick={() => setOpen(true)}
        >
          <Avatar size={28} src={space?.logo} shape="square" />
          <div className="pl-2 text-base font-semibold">{space?.name}</div>
          <div className="pl-2 text-lg">
            {!open ? <RiArrowDownSLine /> : <RiArrowUpSLine />}
          </div>
        </div>
      </Popover>
      <CreateSpaceModal open={openCreate} setOpen={setOpenCreate} />
    </>
  )
}

export default WorkSpace
