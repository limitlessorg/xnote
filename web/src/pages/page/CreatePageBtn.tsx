import { PlusOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import React from 'react'

export type CreatePageBtnProp = { click: () => void }
/**
 * CreatePage Button
 */
const CreatePageBtn: React.FC<CreatePageBtnProp> = ({ click }) => {
  return (
    <>
      <Tooltip title="创建新页面" placement="bottom" mouseLeaveDelay={0}>
        <div className="m-2">
          <Button
            type="text"
            size="large"
            icon={<PlusOutlined rev={undefined} />}
            onClick={click}
          />
        </div>
      </Tooltip>
    </>
  )
}

export default CreatePageBtn
