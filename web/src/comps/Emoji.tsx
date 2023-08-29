import data from '@emoji-mart/data'
import i18n from '@emoji-mart/data/i18n/zh.json'
import Picker from '@emoji-mart/react'

export type EmojiProps = {
  onSelect?: (emoji: string) => void
}

/**
 * 表情 Emoji
 */
const Emoji: React.FC<EmojiProps> = ({ onSelect }) => {
  return (
    <Picker
      data={data}
      i18n={i18n}
      emojiButtonSize={32}
      emojiSize={20}
      previewPosition={'none'}
      onEmojiSelect={(e: { native: string }) => {
        if (onSelect) onSelect(e.native)
      }}
    />
  )
}

export default Emoji
