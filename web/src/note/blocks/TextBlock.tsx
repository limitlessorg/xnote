import Placeholder from '@tiptap/extension-placeholder'
import { Editor, EditorContent, useEditor } from '@tiptap/react'
import { Popover } from 'antd'
import { Block } from 'models/block'
import React, { useState } from 'react'
import {
  RiH1,
  RiH2,
  RiH3,
  RiH4,
  RiListCheck2,
  RiListOrdered,
  RiListUnordered
} from 'react-icons/ri'
import { BlockProps, BlockType } from '.'
import BubbleMenu from '../menus/bubble-menu'
import SlashMenu from '../menus/slash-menu'
import { extensions } from './config'

/**
 * 文本输入
 * @returns
 */
const TextBlock: React.FC<BlockProps> = ({
  block,
  editable = false,
  onBlockChange
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const editor = useEditor({
    extensions: [
      ...extensions,
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return '标题'
          }
          return `输入文字或者'/'命令`
        }
      })
    ],
    content: block.content,
    editable,
    onCreate({ editor }) {
      if (editor.getText() == '') {
        editor.chain().focus('end')
      }
    },
    onUpdate({ editor }) {
      if (editor.getText() == '') {
        editor.chain().focus('end')
      }
      if (editor.getText().endsWith('/')) {
        setOpen(true)
      } else if (editor.getText().endsWith('\n')) {
        // Todo 创建新块
      } else {
        setOpen(false)
        const newBlock: Block = {
          ...block,
          content: editor.getJSON(),
          blockType: BlockType.Text,
          remark: editor.getText()
        }
        onBlockChange(newBlock)
      }
    },
    onBlur() {
      setTimeout(() => {
        setOpen(false)
      }, 200)
    }
  }) as Editor

  return (
    <Popover
      placement="bottomLeft"
      content={
        <SlashMenu
          block={block}
          editor={editor}
          onBlockChange={onBlockChange}
        />
      }
      arrow={false}
      trigger="contextMenu"
      open={open}
      mouseLeaveDelay={0}
      overlayInnerStyle={{ padding: '8px', paddingRight: '0px' }}
    >
      <div className="group flex justify-between">
        {editor && (
          <BubbleMenu
            block={block}
            editor={editor}
            onBlockChange={onBlockChange}
          />
        )}
        <div
          className={`${editor && editor.getText() == '' ? 'w-2/3' : 'w-full'}`}
        >
          <EditorContent editor={editor} />
        </div>
        {editor && editor.getText() == '' && (
          <div className="flex w-1/3 text-gray-500 opacity-0 group-hover:opacity-100">
            <div className="cursor-pointer px-2">
              <RiH1 />
            </div>
            <div className="cursor-pointer px-2">
              <RiH2 />
            </div>
            <div className="cursor-pointer px-2">
              <RiH3 />
            </div>
            <div className="cursor-pointer px-2">
              <RiH4 />
            </div>
            <div className="cursor-pointer px-2">
              <RiListOrdered />
            </div>
            <div className="cursor-pointer px-2">
              <RiListUnordered />
            </div>
            <div className="cursor-pointer px-2">
              <RiListCheck2 />
            </div>
          </div>
        )}
      </div>
    </Popover>
  )
}
export default TextBlock
