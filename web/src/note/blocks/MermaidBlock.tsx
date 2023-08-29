import React, { useEffect, useState, useRef } from 'react'
import mermaid from 'mermaid'
import { Input } from 'antd'
import { BlockProps } from '.'
import Editor from '@monaco-editor/react'

mermaid.initialize({ startOnLoad: false })

const MermaidBlock: React.FC<BlockProps> = ({
  block,
  editable = false,
  onBlockChange
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState<string>(block.content?.text)

  useEffect(() => {
    if (containerRef.current && value) {
      mermaid.render(block.blockType + block.id, value, containerRef.current)
    }
  }, [value, block])

  const handleValueChange = (val: string) => {
    setValue(val)
    onBlockChange({ ...block, content: { text: val } })
  }

  return (
    <div className="flex h-80">
      <div className="h-full w-1/2 p-1">
        <Editor
          className="h-full"
          value={value}
          onChange={(value) => {
            handleValueChange(value as string)
          }}
          options={{
            minimap: {
              enabled: false // 是否启用预览图
            },
            readOnly: !editable
          }}
        />
      </div>
      <div
        id={block.blockType + block.id}
        className="h-full w-1/2 p-1"
        ref={containerRef}
      ></div>
    </div>
  )
}
export default MermaidBlock
