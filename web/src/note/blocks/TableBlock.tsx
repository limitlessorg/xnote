import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import { Editor, EditorContent, useEditor } from '@tiptap/react'
import { Popover } from 'antd'
import { Block } from 'models/block'
import React from 'react'
import { BlockProps, BlockType } from '.'
import BubbleMenu from '../menus/bubble-menu'
import TableMenu from '../menus/table-menu'
import { extensions } from './config'

/**
 * 默认表格(3列3行)
 */
export const defaultContent = {
  type: 'doc',
  content: [
    {
      type: 'table',
      content: [
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableHeader',
              attrs: { colspan: 1, rowspan: 1, colwidth: [160] },
              content: [{ type: 'paragraph' }]
            },
            {
              type: 'tableHeader',
              attrs: { colspan: 1, rowspan: 1, colwidth: [160] },
              content: [{ type: 'paragraph' }]
            },
            {
              type: 'tableHeader',
              attrs: { colspan: 1, rowspan: 1, colwidth: [160] },
              content: [{ type: 'paragraph' }]
            }
          ]
        },
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableCell',
              attrs: { colspan: 1, rowspan: 1, colwidth: [160] },
              content: [{ type: 'paragraph' }]
            },
            {
              type: 'tableCell',
              attrs: { colspan: 1, rowspan: 1, colwidth: [160] },
              content: [{ type: 'paragraph' }]
            },
            {
              type: 'tableCell',
              attrs: { colspan: 1, rowspan: 1, colwidth: [160] },
              content: [{ type: 'paragraph' }]
            }
          ]
        },
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableCell',
              attrs: { colspan: 1, rowspan: 1, colwidth: [160] },
              content: [{ type: 'paragraph' }]
            },
            {
              type: 'tableCell',
              attrs: { colspan: 1, rowspan: 1, colwidth: [160] },
              content: [{ type: 'paragraph' }]
            },
            {
              type: 'tableCell',
              attrs: { colspan: 1, rowspan: 1, colwidth: [160] },
              content: [{ type: 'paragraph' }]
            }
          ]
        }
      ]
    }
  ]
}

/**
 * 简单表格
 * @returns
 */
const TableBlock: React.FC<BlockProps> = ({
  block,
  editable,
  onBlockChange
}) => {
  const editor = useEditor({
    extensions: [
      ...extensions,
      Table.configure({
        resizable: true
      }),
      TableHeader,
      TableRow,
      TableCell
    ],
    content:
      !block.content || Object.keys(block.content).length === 0
        ? defaultContent
        : block.content,
    editable,
    onUpdate({ editor }) {
      const newBlock: Block = {
        ...block,
        content: editor.getJSON(),
        blockType: BlockType.Table
      }
      onBlockChange(newBlock)
    }
  }) as Editor
  return (
    <Popover
      content={
        <TableMenu
          block={block}
          editor={editor}
          onBlockChange={onBlockChange}
        />
      }
      arrow={false}
      trigger="contextMenu"
      mouseLeaveDelay={0.5}
      overlayInnerStyle={{ padding: '8px', paddingRight: '0px' }}
    >
      <div className="mb-2">
        {editor && (
          <BubbleMenu
            block={block}
            editor={editor}
            onBlockChange={onBlockChange}
            hiddenTurn={true}
          />
        )}
        <EditorContent editor={editor} />
      </div>
    </Popover>
  )
}
export default TableBlock
