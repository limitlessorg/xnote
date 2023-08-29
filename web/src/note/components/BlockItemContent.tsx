import { BlockProps, blockRegistry } from '../blocks'

/**
 * 渲染块内容
 * @param block 块
 * @param editable 是否可编辑
 * @param onBlockChange 块变化
 * @returns 内容
 */
const BlockItemContent: React.FC<BlockProps> = ({
  block,
  editable,
  onBlockChange
}) => {
  // 从组件注册对象中获取对应的组件
  const BlockComponent = blockRegistry[block.blockType]

  // 如果找不到对应的组件，返回一个空的 div
  if (!BlockComponent) {
    return <></>
  }

  // 渲染对应的组件
  return (
    <BlockComponent
      block={block}
      editable={editable}
      onBlockChange={onBlockChange}
    />
  )
}

export default BlockItemContent
