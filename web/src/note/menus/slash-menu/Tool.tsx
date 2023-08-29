import { Tooltip } from 'antd'
import {
  RiCodeSSlashLine,
  RiH1,
  RiH2,
  RiH3,
  RiH4,
  RiLink,
  RiListCheck2,
  RiListOrdered,
  RiListUnordered,
  RiText
} from 'react-icons/ri'

import { Editor, JSONContent } from '@tiptap/react'
import { Block } from 'models/block'
import { BlockType, MenuProps } from 'note/blocks'

type ToolItem = {
  title: string
  icon: string | React.ReactNode
  click: (editor: Editor) => void
}

/**
 * 斜杆菜单-基础工具
 */
const SlashMenuTool: React.FC<MenuProps> = ({
  block,
  editor,
  onBlockChange
}) => {
  const editorChange = (content: JSONContent, blockType: BlockType) => {
    const newBlock: Block = {
      ...block,
      content: content,
      blockType
    }
    onBlockChange(newBlock)
  }

  const removeSlash = () => {
    let text = editor.getText()
    if (text.endsWith('/')) {
      text = text.slice(0, -1)
      editor.commands.setContent(text)
    }
  }
  const items1: ToolItem[] = [
    {
      title: '文本',
      icon: <RiText />,
      click: (editor: Editor) => {
        removeSlash()
        editor.chain().setParagraph().run()
        editorChange(editor.getJSON(), BlockType.Text)
      }
    },
    {
      title: '标题1',
      icon: <RiH1 />,
      click: (editor: Editor) => {
        removeSlash()
        editor.chain().toggleHeading({ level: 1 }).run()
        editorChange(editor.getJSON(), BlockType.Heading)
      }
    },
    {
      title: '标题2',
      icon: <RiH2 />,
      click: (editor: Editor) => {
        removeSlash()
        editor.chain().toggleHeading({ level: 2 }).run()
        editorChange(editor.getJSON(), BlockType.Heading)
      }
    },
    {
      title: '标题3',
      icon: <RiH3 />,
      click: (editor: Editor) => {
        removeSlash()
        editor.chain().toggleHeading({ level: 3 }).run()
        editorChange(editor.getJSON(), BlockType.Heading)
      }
    },
    {
      title: '标题4',
      icon: <RiH4 />,
      click: (editor: Editor) => {
        removeSlash()
        editor.chain().toggleHeading({ level: 4 }).run()
        editorChange(editor.getJSON(), BlockType.Heading)
      }
    }
  ]

  const items2: ToolItem[] = [
    {
      title: '有序列表',
      icon: <RiListOrdered />,
      click: (editor: Editor) => {
        removeSlash()
        editor.chain().toggleOrderedList().run()
        editorChange(editor.getJSON(), BlockType.OrderList)
      }
    },
    {
      title: '无序列表',
      icon: <RiListUnordered />,
      click: (editor: Editor) => {
        removeSlash()
        editor.chain().toggleBulletList().run()
        editorChange(editor.getJSON(), BlockType.BulletList)
      }
    },
    {
      title: '待办列表',
      icon: <RiListCheck2 />,
      click: (editor: Editor) => {
        removeSlash()
        editor.chain().toggleTaskList().run()
        editorChange(editor.getJSON(), BlockType.TaskList)
      }
    },
    {
      title: '链接',
      icon: <RiLink />,
      click: (editor: Editor) =>
        editor.chain().toggleLink({ href: '', target: '' }).run()
    },
    {
      title: '行内代码',
      icon: <RiCodeSSlashLine />,
      click: (editor: Editor) => editor.chain().toggleCodeBlock().run()
    }
  ]

  return (
    <>
      <div className="flex">
        {items1.map((item) => {
          return (
            <Tooltip
              title={item.title}
              key={item.title}
              mouseEnterDelay={0.5}
              mouseLeaveDelay={0}
            >
              <div
                className="cursor-pointer rounded px-2 py-1 text-xl hover:bg-gray-200"
                onClick={() => item.click(editor)}
              >
                {item.icon}
              </div>
            </Tooltip>
          )
        })}
      </div>
      <div className="flex">
        {items2.map((item) => {
          return (
            <Tooltip
              title={item.title}
              key={item.title}
              mouseEnterDelay={0.5}
              mouseLeaveDelay={0}
            >
              <div
                className="cursor-pointer rounded px-2 py-1 text-xl hover:bg-gray-200"
                onClick={() => item.click(editor)}
              >
                {item.icon}
              </div>
            </Tooltip>
          )
        })}
      </div>
    </>
  )
}

export default SlashMenuTool
