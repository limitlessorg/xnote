import { Popover } from 'antd'
import React from 'react'
import { RiMoreFill } from 'react-icons/ri'
import ToolbarMore from './More'

/**
 * Header工具栏
 * @returns
 */
const Toolbar: React.FC = () => {
  return (
    <div className="flex">
      <Popover arrow={false} content={<ToolbarMore />} trigger="click">
        <div className="mr-4 cursor-pointer rounded px-1 text-lg hover:bg-neutral-100">
          <RiMoreFill />
        </div>
      </Popover>
    </div>
  )
}
export default Toolbar
