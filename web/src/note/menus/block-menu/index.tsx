import { Block } from 'models/block'
import { BsArrow90DegRight } from 'react-icons/bs'
import {
  RiAddLine,
  RiDeleteBin5Line,
  RiFileCopyLine,
  RiLink
} from 'react-icons/ri'
import { TfiCommentAlt } from 'react-icons/tfi'

export type BlockMenuProps = {
  block: Block
  insertBlock: (block: Block) => void
  deleteBlock: (block: Block) => void
}

const BlockMenu: React.FC<BlockMenuProps> = ({
  block,
  insertBlock,
  deleteBlock
}) => {
  return (
    <>
      <div className="w-36">
        <div
          className="m-1 flex cursor-pointer rounded hover:bg-gray-100"
          onClick={() => insertBlock(block)}
        >
          <div className="px-1 pt-0.5">
            <RiAddLine />
          </div>
          <span className="pl-2">新增块</span>
        </div>
        <div
          className="m-1 flex cursor-pointer rounded hover:bg-gray-100"
          onClick={() => deleteBlock(block)}
        >
          <div className="px-1 pt-0.5">
            <RiDeleteBin5Line />
          </div>
          <span className="pl-2">删除</span>
        </div>
        <div className="m-1 flex cursor-pointer rounded hover:bg-gray-100">
          <div className="px-1 pt-0.5">
            <RiFileCopyLine />
          </div>
          <span className="pl-2">复制</span>
        </div>
        <div className="m-1 flex cursor-pointer rounded hover:bg-gray-100">
          <div className="px-1 pt-0.5 text-sm ">
            <TfiCommentAlt />
          </div>
          <span className="pl-2">评论</span>
        </div>
      </div>
    </>
  )
}

export default BlockMenu
