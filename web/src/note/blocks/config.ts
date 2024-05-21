import BubbleMenu from '@tiptap/extension-bubble-menu'
import CharacterCount from '@tiptap/extension-character-count'
import Color from '@tiptap/extension-color'
import Focus from '@tiptap/extension-focus'
import FontFamily from '@tiptap/extension-font-family'
import Heading from '@tiptap/extension-heading'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import OrderedList from '@tiptap/extension-ordered-list'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import { PluginKey } from 'prosemirror-state'

/**
 * 扩展
 */
export const extensions = [
  StarterKit.configure({
    heading: false,
    orderedList: false
  }),
  BubbleMenu.configure({
    pluginKey: new PluginKey('bubbleMenu')
  }),
  CharacterCount.configure({
    limit: 100 * 1000
  }),
  Color.configure({
    types: ['textStyle']
  }),
  Focus,
  FontFamily,
  Heading.configure({
    levels: [1, 2, 3, 4]
  }),
  Highlight.configure({
    multicolor: true
  }),
  Link.configure({
    HTMLAttributes: {
      title: '链接'
    }
  }),
  OrderedList,
  TextAlign.configure({
    types: ['heading', 'paragraph']
  }),
  TextStyle,
  TaskList,
  TaskItem.configure({
    nested: true
  }),
  Underline
]
