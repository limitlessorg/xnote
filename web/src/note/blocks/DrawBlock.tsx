import { Excalidraw, serializeAsJSON } from '@excalidraw/excalidraw'
import { AppState, BinaryFiles } from '@excalidraw/excalidraw/types/types'
import useSettingStore from 'store/setting'
import { BlockProps, BlockType } from '.'

/**
 * 画板
 */
const DrawBlock: React.FC<BlockProps> = ({ block, onBlockChange }) => {
  const { theme } = useSettingStore()
  return (
    <div className="h-full" style={{ minHeight: '600px' }}>
      <Excalidraw
        initialData={block.content}
        langCode="zh-CN"
        theme={theme.mainTheme}
        onChange={(elements, appState: AppState, files: BinaryFiles) => {
          const res = serializeAsJSON(elements, appState, files, 'database')
          // Todo 保存文件到对象存储，修复 onChange 问题
          if (elements.length !== block.content?.elements?.length) {
            onBlockChange({
              ...block,
              blockType: BlockType.Draw,
              content: JSON.parse(res)
            })
          }
        }}
      ></Excalidraw>
    </div>
  )
}

export default DrawBlock
