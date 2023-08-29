import { Editor } from '@tiptap/react'
import { Popover, Tooltip } from 'antd'
import React from 'react'
import {
  RiAlignCenter,
  RiAlignJustify,
  RiAlignLeft,
  RiAlignRight
} from 'react-icons/ri'

/**
 * BubbleMenu 文本对齐
 * @returns
 */
const BubbleMenuAlign: React.FC<{ editor: Editor }> = ({ editor }) => {
  const content = (
    <div className="flex">
      <Tooltip
        title="左对齐"
        mouseLeaveDelay={0}
        mouseEnterDelay={0.5}
        placement="bottom"
      >
        <div
          className="cursor-pointer p-1 text-lg"
          onClick={() => editor.chain().selectAll().setTextAlign('left').run()}
        >
          <RiAlignLeft />
        </div>
      </Tooltip>
      <Tooltip
        title="居中"
        mouseLeaveDelay={0}
        mouseEnterDelay={0.5}
        placement="bottom"
      >
        <div
          className="cursor-pointer p-1 text-lg"
          onClick={() =>
            editor.chain().selectAll().setTextAlign('center').run()
          }
        >
          <RiAlignCenter />
        </div>
      </Tooltip>
      <Tooltip
        title="右对齐"
        mouseLeaveDelay={0}
        mouseEnterDelay={0.5}
        placement="bottom"
      >
        <div
          className="cursor-pointer p-1 text-lg"
          onClick={() => editor.chain().selectAll().setTextAlign('right').run()}
        >
          <RiAlignRight />
        </div>
      </Tooltip>
      <Tooltip
        title="自适应"
        mouseLeaveDelay={0}
        mouseEnterDelay={0.5}
        placement="bottom"
      >
        <div
          className="cursor-pointer p-1 text-lg"
          onClick={() =>
            editor.chain().selectAll().setTextAlign('justify').run()
          }
        >
          <RiAlignJustify />
        </div>
      </Tooltip>
    </div>
  )

  return (
    <Popover
      placement="bottom"
      trigger={['click', 'contextMenu']}
      content={content}
      mouseEnterDelay={0}
      mouseLeaveDelay={0.8}
      showArrow={false}
      overlayInnerStyle={{ padding: '2px' }}
    >
      <div>
        <Tooltip title="对齐方式" mouseLeaveDelay={0} mouseEnterDelay={0}>
          <div className="flex">
            <RiAlignJustify />
          </div>
        </Tooltip>
      </div>
    </Popover>
  )
}
export default BubbleMenuAlign
