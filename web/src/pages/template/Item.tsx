import Icon from 'comps/Icon'
import SelectSpaceModal from 'modals/SelectSpaceModal'
import { Template } from 'models/template'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { convertToDateTimeStr } from 'utils'

type TemplateItemProps = {
  template: Template
}

const TemplateItem: React.FC<TemplateItemProps> = ({ template }) => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const copy = () => {
    setOpen(true)
  }

  return (
    <>
      <div className="py-4">
        <div
          className="flex cursor-pointer text-lg font-bold"
          onClick={() => navigate(`/share/${template.blockId}`)}
        >
          <Icon icon={template.block.content?.icon}></Icon>
          <div>{template.title}</div>
        </div>
        <div className="py-3 px-2">{template.description}</div>
        <div className="flex justify-between text-sm text-gray-500">
          <div className="flex">
            <div className="px-2">{template.user.name}</div>
            <div className="px-2">
              {convertToDateTimeStr(template.updatedAt)}
            </div>
          </div>
          <div className="flex">
            <div className="cursor-pointer px-2">点赞</div>
            <div className="cursor-pointer px-2">评论</div>
            <div className="cursor-pointer px-2" onClick={copy}>
              使用
            </div>
          </div>
        </div>
      </div>
      <SelectSpaceModal open={open} setOpen={setOpen} />
    </>
  )
}

export default TemplateItem
