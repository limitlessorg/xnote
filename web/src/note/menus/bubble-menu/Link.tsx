import { Editor } from '@tiptap/react'
import { Input } from 'antd'
import React from 'react'

/**
 * BubbleMenu 链接
 * @returns
 */
const BubbleMenuLink: React.FC<{ editor: Editor }> = ({ editor }) => {
  const click = (link: string, target?: string) => {
    if (link && link.startsWith('http')) {
      editor
        .chain()
        .focus()
        .setLink({ href: link, target: target || '_blank' })
        .run()
    } else {
      editor.chain().focus().unsetLink().run()
    }
  }

  return (
    <div className="w-64">
      <Input
        placeholder="请粘贴链接或者搜索页面"
        onPressEnter={(e) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const link: string = (e.target as any).value
          click(link)
        }}
      />
      {/* <div>
        <div className="m-1 text-xs font-bold text-gray-500">最近打开</div>
        <div
          className="cursor-pointer rounded p-1 pl-2 hover:bg-gray-100"
          onClick={() => {
            click(
              'http://127.0.0.1:5173/36f01476-896d-42d6-a9b4-65c3c753bf96',
              '_self'
            )
          }}
        >
          页面11
        </div>
        <div className="cursor-pointer rounded p-1 pl-2 hover:bg-gray-100">
          页面2
        </div>
        <div className="cursor-pointer rounded p-1 pl-2 hover:bg-gray-100">
          页面3
        </div>
      </div> */}
    </div>
  )
}
export default BubbleMenuLink
