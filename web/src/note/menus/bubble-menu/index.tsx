import { BubbleMenu as TiptapBubbleMenu } from '@tiptap/react'
import { Popover, Tooltip } from 'antd'
import { MenuProps } from 'note/blocks'
import React from 'react'
import { RiFontColor, RiLinksLine, RiText } from 'react-icons/ri'
import BubbleMenuAlign from './Align'
import BubbleMenuColor from './Color'
import BubbleMenuLink from './Link'
import BubbleMenuMark from './Mark'
import BubbleMenuTurn from './Turn'

/**
 * Bubble 菜单
 * @returns
 */
const BubbleMenu: React.FC<MenuProps> = ({
  block,
  editor,
  onBlockChange,
  hiddenTurn
}) => {
  return (
    <TiptapBubbleMenu editor={editor} tippyOptions={{ duration: 600 }}>
      <div className="z-50 flex select-none rounded border border-solid border-gray-300 bg-white shadow-md">
        {!hiddenTurn && (
          <Tooltip title="文本" placement="top">
            <div>
              <Popover
                className="shadow-md"
                placement="bottom"
                content={
                  <BubbleMenuTurn
                    block={block}
                    editor={editor}
                    onBlockChange={onBlockChange}
                  />
                }
                trigger="click"
                showArrow={false}
                overlayInnerStyle={{ padding: '8px', paddingRight: '0px' }}
              >
                <div className="flex h-full cursor-pointer rounded-l border-0 px-2 pt-1 outline-none hover:bg-gray-200">
                  <div className="pt-1">
                    <RiText />
                  </div>
                  <div className="pb-1 pl-0.5 text-sm">文本</div>
                </div>
              </Popover>
            </div>
          </Tooltip>
        )}

        <Tooltip title="链接" placement="top">
          <div>
            <Popover
              className="shadow-md"
              placement="bottom"
              content={<BubbleMenuLink editor={editor} />}
              trigger="click"
              showArrow={false}
            >
              <div className="flex h-full cursor-pointer border-0 px-2 pt-1 outline-none hover:bg-gray-200">
                <div className="pt-1">
                  <RiLinksLine />
                </div>
                <div className="pb-1 pl-1 text-sm">链接</div>
              </div>
            </Popover>
          </div>
        </Tooltip>

        <BubbleMenuMark editor={editor} />

        <div className="cursor-pointer px-2 pt-2">
          <BubbleMenuAlign editor={editor} />
        </div>

        <Tooltip title="颜色" placement="top">
          <div>
            <Popover
              className="shadow-md"
              placement="bottom"
              content={<BubbleMenuColor editor={editor} />}
              trigger="click"
              showArrow={false}
            >
              <div className="flex h-full cursor-pointer rounded-r border-0 px-2 pt-1 outline-none hover:bg-gray-200">
                <div className="pt-1">
                  <RiFontColor />
                </div>
                <div className="pb-1 pl-1 text-sm">颜色</div>
              </div>
            </Popover>
          </div>
        </Tooltip>
      </div>
    </TiptapBubbleMenu>
  )
}
export default BubbleMenu
