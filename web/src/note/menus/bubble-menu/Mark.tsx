import { Editor } from '@tiptap/react'
import { Tooltip } from 'antd'
import React from 'react'
import {
  RiBold,
  RiCodeSLine,
  RiItalic,
  RiStrikethrough,
  RiUnderline
} from 'react-icons/ri'

/**
 * BubbleMenu 字体标记
 * @returns
 */
const BubbleMenuMark: React.FC<{ editor: Editor }> = ({ editor }) => {
  return (
    <>
      <Tooltip
        title={
          <>
            <div className="text-sm">加粗</div>
            <div className="text-xs">Ctrl+B</div>
          </>
        }
        placement="top"
      >
        <div
          className="cursor-pointer p-1 text-base hover:bg-gray-200"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <RiBold />
        </div>
      </Tooltip>

      <Tooltip
        title={
          <>
            <div className="text-sm">倾斜</div>
            <div className="text-xs">Ctrl+I</div>
          </>
        }
        placement="top"
      >
        <div
          className="cursor-pointer p-1 text-base hover:bg-gray-200"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <RiItalic />
        </div>
      </Tooltip>

      <Tooltip
        title={
          <>
            <div className="text-sm">删除线</div>
            <div className="text-xs">Ctrl+X</div>
          </>
        }
        placement="top"
      >
        <div
          className="cursor-pointer p-1 text-base hover:bg-gray-200"
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <RiStrikethrough />
        </div>
      </Tooltip>

      <Tooltip
        title={
          <>
            <div className="text-sm">下划线</div>
            <div className="text-xs">Ctrl+U</div>
          </>
        }
        placement="top"
      >
        <div
          className="cursor-pointer p-1 text-base hover:bg-gray-200"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <RiUnderline />
        </div>
      </Tooltip>

      <Tooltip
        title={
          <>
            <div className="text-sm">标记代码</div>
            <div className="text-xs">Ctrl+E</div>
          </>
        }
        placement="top"
      >
        <div
          className="cursor-pointer p-1 text-base hover:bg-gray-200"
          onClick={() => {
            editor.chain().focus().toggleCode().run()
          }}
        >
          <RiCodeSLine />
        </div>
      </Tooltip>
    </>
  )
}
export default BubbleMenuMark
