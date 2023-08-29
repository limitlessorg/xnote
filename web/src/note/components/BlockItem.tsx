import { Popover, Tooltip } from 'antd'
import { useHeightObserver } from 'hooks'
import { Block } from 'models/block'
import { useRef } from 'react'
import { MdOutlineDragIndicator } from 'react-icons/md'
import BlockMenu from '../menus/block-menu'
import BlockItemContent from './BlockItemContent'

type BlockItemProp = {
  index: number
  block: Block
  editable: boolean
  insertBlock: (preBlock: Block) => void
  deleteBlock: (block: Block) => void
  onBlockChange: (block: Block) => void
  onHeightChange: (height: number) => void
}

/**
 * Block块项
 * @param param
 * @returns
 */
const BlockItem: React.FC<BlockItemProp> = ({
  block,
  editable,
  insertBlock,
  deleteBlock,
  onBlockChange,
  onHeightChange
}) => {
  const ref = useRef<HTMLDivElement>(null)
  // 调用自定义 Hook，传入 ref 和一个打印高度变化的函数
  const height = useHeightObserver(ref, (newHeight) => {
    onHeightChange(newHeight)
  })

  return (
    <div className="group flex" ref={ref}>
      <Popover
        className="group"
        placement="leftTop"
        arrow={false}
        content={
          <BlockMenu
            block={block}
            insertBlock={insertBlock}
            deleteBlock={deleteBlock}
          />
        }
        trigger={['click', 'contextMenu']}
      >
        <div className="h-6 w-6 pr-1">
          <Tooltip
            placement="top"
            title="单击打开菜单，长按拖动排序"
            mouseLeaveDelay={0}
            mouseEnterDelay={0.8}
          >
            <div className="h-6 w-6 cursor-grabbing rounded px-1 text-lg opacity-0 hover:bg-neutral-100 hover:text-neutral-400 group-hover:opacity-100">
              <MdOutlineDragIndicator />
            </div>
          </Tooltip>
        </div>
      </Popover>
      <div className="w-full">
        <BlockItemContent
          block={block}
          editable={editable}
          onBlockChange={onBlockChange}
        />
      </div>
    </div>
  )
}

export default BlockItem
