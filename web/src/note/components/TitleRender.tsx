import { useQueryClient } from '@tanstack/react-query'
import { Badge, Dropdown, MenuProps } from 'antd'
import Icon from 'comps/Icon'
import { Block, UpdateBlock } from 'models/block'
import { RiMoreFill } from 'react-icons/ri'
import { updateBlock } from 'repo'
import { DataNode } from 'types'
import { BlockType } from '../blocks'

export interface ITitleRenderProps {
  node: DataNode
  handleNodeClick: (node: DataNode) => void
  handleOperationClick: (operationKey: string, node: DataNode) => void
}

/**
 * 树节点信息渲染
 */
const TitleRender: React.FC<ITitleRenderProps> = ({
  node,
  handleNodeClick,
  handleOperationClick
}) => {
  const queryClient = useQueryClient()
  const block = node as unknown as Block
  /**
   * 修改图标
   * @param icon 图标
   */
  const updateIcon = (icon: string, id: string) => {
    const newBlock: UpdateBlock = {
      id,
      blockType: BlockType.Page,
      content: { ...block.content, icon }
    }
    updateBlock(newBlock).then((res) => {
      queryClient.resetQueries(['treeBlock'])
    })
  }

  const onOperationClick: MenuProps['onClick'] = ({ key }) => {
    handleOperationClick(key, node)
  }

  return (
    <div className="group flex w-full justify-between">
      <div className="flex w-full">
        <div className="px-1 text-base hover:bg-neutral-200">
          <Icon
            icon={block.content.icon}
            readonly={false}
            onSelect={(icon: string) => {
              updateIcon(icon, node.key as string)
            }}
          />
        </div>

        <div className="w-full" onClick={() => handleNodeClick(node)}>
          <Badge count={node.badge || 0} size="small">
            {block.content.name}
          </Badge>
        </div>
      </div>
      <div className="mt-0.5 flex">
        <Dropdown
          menu={{ items: node.operations || [], onClick: onOperationClick }}
        >
          <div className="cursor-pointer rounded px-1 text-lg opacity-0 hover:bg-neutral-200 group-hover:opacity-100">
            <RiMoreFill />
          </div>
        </Dropdown>
      </div>
    </div>
  )
}

export default TitleRender
