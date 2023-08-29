import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { BlockProps } from '.'

type ObjContent = {
  id: string
  category: string
  showFields: string[]
}

/**
 * 数据对象块
 * @returns
 */
const ObjBlock: React.FC<BlockProps> = ({
  block,
  editable = false,
  onBlockChange
}) => {
  const { id, category, showFields } = block.content as ObjContent

  return <div className="flex">数据对象</div>
}
export default ObjBlock
