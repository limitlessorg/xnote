import { JSONContent } from '@tiptap/react'
import { Avatar } from 'antd'
import { Block } from 'models/block'
import { BlockType, MenuProps } from 'note/blocks'
import {
  RiBillLine,
  RiFileUploadLine,
  RiImageAddFill,
  RiTable2
} from 'react-icons/ri'

/**
 * 斜杆菜单-基础组件
 */
const SlashMenuBasic: React.FC<MenuProps> = ({
  block,
  editor,
  onBlockChange
}) => {
  const defaultContent: JSONContent = {}
  const editorChange = (content: JSONContent, blockType: BlockType) => {
    const newBlock: Block = {
      ...block,
      content: content,
      blockType
    }
    onBlockChange(newBlock)
  }
  return (
    <>
      <div className="mx-2 my-1 text-xs text-neutral-500">基础</div>
      <div className="flex">
        <div
          className="m-1 flex cursor-pointer rounded-md p-1 pr-5 hover:bg-gray-200"
          onClick={() => {
            editorChange(editor.getJSON(), BlockType.Image)
          }}
        >
          <Avatar shape="square" size={32} icon={<RiImageAddFill />} />
          <div className="pl-4 pt-1">图片</div>
        </div>
        <div
          className="m-1 flex cursor-pointer rounded-md p-1 pr-5 hover:bg-gray-200"
          onClick={() => {
            editorChange(defaultContent, BlockType.Table)
          }}
        >
          <Avatar shape="square" size={32} icon={<RiTable2 />} />
          <div className="pl-4 pt-1">表格</div>
        </div>
      </div>

      <div className="flex">
        <div
          className="m-1 flex cursor-pointer rounded-md p-1 pr-5 hover:bg-gray-200"
          onClick={() => {
            editorChange(editor.getJSON(), BlockType.File)
          }}
        >
          <Avatar shape="square" size={32} icon={<RiFileUploadLine />} />
          <div className="pl-4 pt-1">附件</div>
        </div>
        <div
          className="m-1 flex cursor-pointer rounded-md p-1 pr-5 hover:bg-gray-200"
          onClick={() => {
            editorChange(editor.getJSON(), BlockType.Form)
          }}
        >
          <Avatar shape="square" size={32} icon={<RiBillLine />} />
          <div className="pl-4 pt-1">表单</div>
        </div>
        {/* <div className="m-1 flex cursor-pointer rounded-md p-1 pr-5 hover:bg-gray-200">
          <Avatar shape="square" size={32} icon={<RiAtLine />} />
          <div className="pl-4 pt-1">提及</div>
        </div> */}
      </div>
    </>
  )
}

export default SlashMenuBasic
