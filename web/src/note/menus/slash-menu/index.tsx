import { MenuProps } from 'note/blocks'
import SlashMenuBasic from './Basic'
import SlashMenuTool from './Tool'
import SlashMenuWidget from './Widget'

/**
 * 斜杆菜单
 */
const SlashMenu: React.FC<MenuProps> = ({ block, editor, onBlockChange }) => {
  return (
    <div className="h-96 select-none overflow-y-auto">
      <SlashMenuTool
        block={block}
        editor={editor}
        onBlockChange={onBlockChange}
      />
      <SlashMenuBasic
        block={block}
        editor={editor}
        onBlockChange={onBlockChange}
      />
      <SlashMenuWidget
        block={block}
        editor={editor}
        onBlockChange={onBlockChange}
      />
    </div>
  )
}

export default SlashMenu
