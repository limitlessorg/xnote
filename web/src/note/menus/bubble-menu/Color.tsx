import { Editor } from '@tiptap/react'
import { Input } from 'antd'
import React from 'react'
import { RiFontColor } from 'react-icons/ri'

/**
 * 颜色菜单
 */
const colorMenuItems = [
  { title: '黑', color: '#000000' },
  { title: '红', color: '#ff0000' },
  { title: '橙', color: '#ff7f00' },
  { title: '黄', color: '#ffff00' },
  { title: '绿', color: '#00ff00' },
  { title: '青', color: '#00ffff' },
  { title: '蓝', color: '#0000ff' },
  { title: '紫', color: '#8b00ff' }
]

/**
 * 颜色菜单
 */
const bgColorMenuItems = [
  { title: '白', color: '#ffffff' },
  { title: '红', color: '#ff0000' },
  { title: '橙', color: '#ff7f00' },
  { title: '黄', color: '#ffff00' },
  { title: '绿', color: '#00ff00' },
  { title: '青', color: '#00ffff' },
  { title: '蓝', color: '#0000ff' },
  { title: '紫', color: '#8b00ff' }
]

/**
 * BubbleMenu 字体颜色
 * @returns
 */
const BubbleMenuColor: React.FC<{ editor: Editor }> = ({ editor }) => {
  return (
    <div className="w-72">
      <div className="flex">
        <div className="px-2 text-slate-600">字体颜色</div>
        <Input
          type="color"
          size="small"
          placeholder="请选择颜色"
          style={{ width: '90px' }}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onInput={(event: any) =>
            editor.chain().focus().setColor(event.target.value).run()
          }
          value={editor.getAttributes('textStyle').color}
        />
      </div>
      <div className="flex">
        {colorMenuItems.map((item, index) => {
          return (
            <div
              className="cursor-pointer select-none rounded px-2 hover:bg-gray-100"
              key={index}
              onClick={() => editor.chain().focus().setColor(item.color).run()}
            >
              <div className="pt-1">
                <div style={{ color: item.color }} className=" text-lg">
                  <RiFontColor />
                </div>
                <div className="pl-0.5">{item.title}</div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex pt-5">
        <div className="px-2 text-slate-600">背景颜色</div>
        <Input
          type="color"
          size="small"
          placeholder="请选择颜色"
          style={{ width: '90px' }}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onInput={(event: any) =>
            editor
              .chain()
              .focus()
              .setHighlight({ color: event.target.value })
              .run()
          }
          // TODO 设置颜色
          value={editor.getAttributes('data-color').color}
        />
      </div>
      <div className="flex">
        {bgColorMenuItems.map((item, index) => {
          return (
            <div
              className="cursor-pointer select-none rounded px-2 hover:bg-gray-100"
              key={index}
              onClick={() => {
                editor.chain().focus().setHighlight({ color: item.color }).run()
              }}
            >
              <div className="pt-1">
                <div
                  style={{ backgroundColor: item.color }}
                  className=" text-lg"
                >
                  <RiFontColor />
                </div>
                <div className="pl-0.5">{item.title}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default BubbleMenuColor
