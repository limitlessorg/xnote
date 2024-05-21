import { Editor } from '@tiptap/react'
import { Tooltip } from 'antd'
import { MenuProps } from 'note/blocks'

const items = [
  {
    label: '插入表格',
    title: '单元格内插入表格',
    click: (editor: Editor) => {
      editor
        .chain()
        .focus()
        .insertTable({ rows: 2, cols: 3, withHeaderRow: true })
        .run()
    }
  },
  {
    label: '删除表格',
    title: '删除表格',
    click: (editor: Editor) => {
      editor.chain().focus().deleteTable().run()
    }
  },
  {
    label: '前面插入列',
    title: '在当前列前面插入一列',
    click: (editor: Editor) => {
      editor.chain().focus().addColumnBefore().run()
    }
  },
  {
    label: '后面插入列',
    title: '在当前列后面插入一列',
    click: (editor: Editor) => {
      editor.chain().focus().addColumnAfter().run()
    }
  },
  {
    label: '删除列',
    title: '删除当前列',
    click: (editor: Editor) => {
      editor.chain().focus().deleteColumn().run()
    }
  },
  {
    label: '上方插入行',
    title: '在当前行上方插入一行',
    click: (editor: Editor) => {
      editor.chain().focus().addRowBefore().run()
    }
  },
  {
    label: '下方插入行',
    title: '在当前行下方插入一行',
    click: (editor: Editor) => {
      editor.chain().focus().addRowAfter().run()
    }
  },
  {
    label: '删除行',
    title: '删除当前行',
    click: (editor: Editor) => {
      editor.chain().focus().deleteRow().run()
    }
  },
  {
    label: '合并单元格',
    title: '合并单元格',
    click: (editor: Editor) => {
      editor.chain().focus().mergeCells().run()
    }
  },
  {
    label: '拆分单元格',
    title: '拆分单元格',
    click: (editor: Editor) => {
      editor.chain().focus().splitCell().run()
    }
  },
  {
    label: '列转化为表头',
    title: '把当前列转换为表头',
    click: (editor: Editor) => {
      editor.chain().focus().toggleHeaderColumn().run()
    }
  },
  {
    label: '行转化为表头',
    title: '把当前行转换为表头',
    click: (editor: Editor) => {
      editor.chain().focus().toggleHeaderRow().run()
    }
  },
  {
    label: '单元格转化为表头',
    title: '把当前单元格转化为表头',
    click: (editor: Editor) => {
      editor.chain().focus().toggleHeaderCell().run()
    }
  },
  {
    label: '下一单元格',
    title: '下一单元格',
    click: (editor: Editor) => {
      editor.chain().focus().goToNextCell().run()
    }
  },
  {
    label: '上一单元格',
    title: '上一单元格',
    click: (editor: Editor) => {
      editor.chain().focus().goToPreviousCell().run()
    }
  }
]

/**
 * 表格操作菜单
 * @returns
 */
const TableMenu: React.FC<MenuProps> = ({ editor }) => {
  return (
    <div>
      {items.map((item, index) => {
        return (
          <div key={index}>
            <Tooltip
              title={<div className="text-sm">{item.title}</div>}
              mouseLeaveDelay={0}
              mouseEnterDelay={0.8}
              placement="top"
            >
              <div
                className="m-1 cursor-pointer rounded p-1 px-2 text-sm hover:bg-gray-200"
                onClick={() => {
                  item.click(editor)
                }}
              >
                {item.label}
              </div>
            </Tooltip>
          </div>
        )
      })}
    </div>
  )
}
export default TableMenu
