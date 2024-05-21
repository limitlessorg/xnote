import { Editor, JSONContent } from '@tiptap/react'
import { Avatar } from 'antd'
import { Block } from 'models/block'
import { BlockType, MenuProps } from 'note/blocks'
import {
  AiOutlineBorderHorizontal,
  AiOutlineBorderLeft,
  AiOutlineHighlight,
  AiOutlineLine,
  AiOutlineNodeIndex,
  AiOutlineTable
} from 'react-icons/ai'
import {
  RiAlignLeft,
  RiBookOpenLine,
  RiBookReadLine,
  RiCalendar2Line,
  RiCodeSSlashFill,
  RiFileWordLine,
  RiFolderMusicLine,
  RiGithubFill,
  RiKeyboardBoxLine,
  RiMapPin2Line,
  RiMarkdownLine,
  RiVideoAddLine,
  RiVolumeUpLine
} from 'react-icons/ri'

type WidgetItem = {
  title: string
  description: string
  icon: string | React.ReactNode
  click: (editor: Editor) => void
}

type WidgetGroup = {
  title: string
  items: WidgetItem[]
}

/**
 * 斜杆菜单
 */
const SlashMenuWidget: React.FC<MenuProps> = ({
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
  const groups: WidgetGroup[] = [
    {
      title: '多媒体',
      items: [
        {
          title: '语音',
          description: '语音',
          icon: <RiVolumeUpLine />,
          click: (editor: Editor) => {
            editorChange(editor.getJSON(), BlockType.Audio)
          }
        },
        {
          title: '视频',
          description: '视频',
          icon: <RiVideoAddLine />,
          click: (editor: Editor) => {
            editorChange(editor.getJSON(), BlockType.Video)
          }
        }
      ]
    },
    {
      title: '画图类',
      items: [
        {
          title: '画板',
          description: '使用鼠标绘图',
          icon: <AiOutlineHighlight />,
          click: (editor: Editor) => {
            editorChange(editor.getJSON(), BlockType.Draw)
          }
        },
        {
          title: '思维导图',
          description: '画思维导图',
          icon: <AiOutlineNodeIndex />,
          click: (editor: Editor) => {
            console.log(editor)
          }
        }
      ]
    },
    {
      title: '数据展示',
      items: [
        {
          title: '数据表格',
          description: '数据表格',
          icon: <AiOutlineTable />,
          click: (editor: Editor) => {
            editorChange(editor.getJSON(), BlockType.DataShow)
          }
        },
        {
          title: '数据对象',
          description: '数据对象',
          icon: <AiOutlineTable />,
          click: (editor: Editor) => {
            editorChange(editor.getJSON(), BlockType.DataShow)
          }
        },
        {
          title: '图表',
          description: '图表',
          icon: <RiKeyboardBoxLine />,
          click: () => {
            editorChange({}, BlockType.Chart)
          }
        },
        {
          title: '画册',
          description: '画册',
          icon: <RiBookOpenLine />,
          click: (editor: Editor) => {
            console.log(editor)
          }
        },
        {
          title: '看板',
          description: '看板',
          icon: <RiKeyboardBoxLine />,
          click: (editor: Editor) => {
            console.log(editor)
          }
        }
      ]
    },
    {
      title: '布局和样式',
      items: [
        {
          title: '分栏卡片',
          description: '分栏卡片',
          icon: <AiOutlineBorderHorizontal />,
          click: (editor: Editor) => {
            console.log(editor)
          }
        },
        {
          title: '引用',
          description: '引用块',
          icon: <AiOutlineBorderLeft />,
          click: (editor: Editor) => {
            console.log(editor)
          }
        },
        {
          title: '块分割线',
          description: '块分割线',
          icon: <AiOutlineLine />,
          click: (editor: Editor) => {
            editorChange(editor.getJSON(), BlockType.Divider)
          }
        }
      ]
    },
    {
      title: '小工具',
      items: [
        {
          title: '日历',
          description: '日历',
          icon: <RiCalendar2Line />,
          click: (editor: Editor) => {
            console.log(editor)
          }
        },
        {
          title: '投票工具',
          description: '投票工具',
          icon: <RiAlignLeft />,
          click: (editor: Editor) => {
            console.log(editor)
          }
        },
        {
          title: '阅读打卡',
          description: '阅读打卡',
          icon: <RiBookReadLine />,
          click: (editor: Editor) => {
            console.log(editor)
          }
        }
      ]
    },
    {
      title: '程序员专区',
      items: [
        {
          title: 'Markdown',
          description: 'Markdown',
          icon: <RiMarkdownLine />,
          click: (editor: Editor) => {
            console.log(editor)
          }
        },
        {
          title: '文本绘图',
          description: '文本绘图',
          icon: <AiOutlineBorderLeft />,
          click: () => {
            editorChange({}, BlockType.Mermaid)
          }
        },
        {
          title: '代码编辑',
          description: '代码编辑',
          icon: <RiCodeSSlashFill />,
          click: () => {
            editorChange({ type: 'code', value: '' }, BlockType.CodeEditor)
          }
        }
      ]
    },
    {
      title: '第三方服务',
      items: [
        {
          title: 'Figma',
          description: 'Figma',
          icon: <AiOutlineBorderHorizontal />,
          click: (editor: Editor) => {
            console.log(editor)
          }
        },
        {
          title: '高德地图',
          description: '高德地图',
          icon: <RiMapPin2Line />,
          click: (editor: Editor) => {
            console.log(editor)
          }
        },
        {
          title: 'Github',
          description: 'Github',
          icon: <RiGithubFill />,
          click: (editor: Editor) => {
            console.log(editor)
          }
        },
        {
          title: 'WPS',
          description: 'WPS',
          icon: <RiFileWordLine />,
          click: (editor: Editor) => {
            console.log(editor)
          }
        },
        {
          title: '抖音',
          description: '抖音',
          icon: <RiFolderMusicLine />,
          click: (editor: Editor) => {
            console.log(editor)
          }
        }
      ]
    }
  ]
  return (
    <>
      {groups.map((g) => {
        return (
          <div key={g.title}>
            <div className="mx-2 my-1 text-xs text-neutral-500">{g.title}</div>
            {g.items.map((item) => {
              return (
                <div
                  key={item.title}
                  className="m-1 mb-3 flex cursor-pointer rounded-md p-1 hover:bg-gray-200"
                  onClick={() => item.click(editor)}
                >
                  <Avatar shape="square" size={36} icon={item.icon} />
                  <div className="ml-2">
                    <div>{item.title}</div>
                    <div className="text-xs text-neutral-500">
                      {item.description}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </>
  )
}

export default SlashMenuWidget
