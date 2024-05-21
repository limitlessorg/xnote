import { Editor } from '@tiptap/react'
import { Avatar } from 'antd'
import { MenuProps } from 'note/blocks'
import React from 'react'
import {
  RiH1,
  RiH2,
  RiH3,
  RiH4,
  RiListCheck2,
  RiListOrdered,
  RiListUnordered,
  RiText
} from 'react-icons/ri'

type TurnItem = {
  title: string
  icon: string | React.ReactNode
  click: (editor: Editor) => void
}

/**
 * BubbleMenu 转化
 * @returns
 */
const BubbleMenuTurn: React.FC<MenuProps> = ({ editor, onBlockChange }) => {
  const items: TurnItem[] = [
    {
      title: '文本',
      icon: <RiText />,
      click: (editor: Editor) => editor.chain().selectAll().setParagraph().run()
    },
    {
      title: '标题1',
      icon: <RiH1 />,
      click: (editor: Editor) => {
        editor.chain().selectAll().toggleHeading({ level: 1 }).run()
      }
    },
    {
      title: '标题2',
      icon: <RiH2 />,
      click: (editor: Editor) =>
        editor.chain().selectAll().toggleHeading({ level: 2 }).run()
    },
    {
      title: '标题3',
      icon: <RiH3 />,
      click: (editor: Editor) =>
        editor.chain().selectAll().toggleHeading({ level: 3 }).run()
    },
    {
      title: '标题4',
      icon: <RiH4 />,
      click: (editor: Editor) =>
        editor.chain().selectAll().toggleHeading({ level: 4 }).run()
    },
    {
      title: '有序列表',
      icon: <RiListOrdered />,
      click: (editor: Editor) =>
        editor.chain().selectAll().toggleOrderedList().run()
    },
    {
      title: '无序列表',
      icon: <RiListUnordered />,
      click: (editor: Editor) =>
        editor.chain().selectAll().toggleBulletList().run()
    },
    {
      title: '待办列表',
      icon: <RiListCheck2 />,
      click: (editor: Editor) =>
        editor.chain().selectAll().toggleTaskList().run()
    }
  ]
  return (
    <div className="h-64 w-32 overflow-y-auto">
      {items.map((item) => {
        return (
          <div
            key={item.title}
            className="flex cursor-pointer select-none rounded p-0.5 pl-1 hover:bg-gray-100"
            onClick={() => item.click(editor)}
          >
            <div className="py-0.5 pl-1">
              <Avatar shape="square" size={24} icon={item.icon} />
            </div>
            <div className="px-2">{item.title}</div>
          </div>
        )
      })}
    </div>
  )
}
export default BubbleMenuTurn
