import { Tooltip } from 'antd'
import React from 'react'
import { RiAddLine } from 'react-icons/ri'

export type CreatePageBtnProp = { click: () => void }
/**
 * CreatePage Button
 */
const CreatePageBtn: React.FC<CreatePageBtnProp> = ({ click }) => {
  return (
    <>
      <Tooltip title="创建新页面" placement="bottom" mouseLeaveDelay={0}>
        <div
          className="m-3 flex cursor-pointer select-none rounded p-1 px-2 hover:bg-neutral-200"
          onClick={click}
        >
          <div className="text-xl">
            <RiAddLine />
          </div>
        </div>
      </Tooltip>
    </>
  )
}

export default CreatePageBtn
