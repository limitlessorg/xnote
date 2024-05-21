import Icon from 'comps/Icon'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BlockProps } from '.'

/**
 * 页面
 * @returns
 */
const PageBlock: React.FC<BlockProps> = ({
  block,
  editable = false,
  onBlockChange
}) => {
  const navigate = useNavigate()
  return (
    <div className="my-0.5 flex cursor-pointer">
      <div>
        <Icon icon={block.content.icon} readonly={false} />
      </div>
      <div onClick={() => navigate(`/design/page/${block.id}`)}>
        {block.content.name}
      </div>
    </div>
  )
}
export default PageBlock
