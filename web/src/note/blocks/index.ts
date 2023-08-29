import AudioBlock from '../blocks/AudioBlock'
import CodeEditorBlock from '../blocks/CodeEditorBlock'
import DividerBlock from '../blocks/DividerBlock'
import FileBlock from '../blocks/FileBlock'
import ImageBlock from '../blocks/ImageBlock'
import PageBlock from '../blocks/PageBlock'
import TableBlock from '../blocks/TableBlock'
import TextBlock from '../blocks/TextBlock'
import VideoBlock from '../blocks/VideoBlock'
import DrawBlock from '../blocks/DrawBlock'
import { Block } from 'models/block'
import { Editor } from '@tiptap/react'
import MindmapBlock from './MindMapBlock'
import ChartBlock from './chart/ChartBlock'
import MermaidBlock from './MermaidBlock'
import ObjBlock from './ObjBlock'

/**
 * 块类型
 */
export enum BlockType {
  Page = 'page',
  Text = 'text',
  Heading = 'heading',
  Image = 'image',
  Table = 'table',
  OrderList = 'orderList',
  TaskList = 'taskList',
  BulletList = 'bulletList',
  CodeEditor = 'codeEditor',
  Video = 'video',
  Audio = 'audio',
  File = 'file',
  DataShow = 'dataShow',
  Divider = 'divider',
  Mermaid = 'mermaid',
  Markdown = 'markdown',
  Form = 'form',
  Draw = 'draw',
  Chart = 'chart',
  MindMap = 'mindMap',
  Obj = 'obj'
}

// 块注册对象
export const blockRegistry: Record<string, any> = {
  [BlockType.Text]: TextBlock,
  [BlockType.Heading]: TextBlock,
  [BlockType.TaskList]: TextBlock,
  [BlockType.OrderList]: TextBlock,
  [BlockType.BulletList]: TextBlock,
  [BlockType.Page]: PageBlock,
  [BlockType.Table]: TableBlock,
  [BlockType.Image]: ImageBlock,
  [BlockType.CodeEditor]: CodeEditorBlock,
  [BlockType.Video]: VideoBlock,
  [BlockType.Audio]: AudioBlock,
  [BlockType.File]: FileBlock,
  [BlockType.Divider]: DividerBlock,
  [BlockType.Draw]: DrawBlock,
  [BlockType.Chart]: ChartBlock,
  [BlockType.Mermaid]: MermaidBlock,
  [BlockType.MindMap]: MindmapBlock,
  [BlockType.Obj]: ObjBlock
}

// 注册块
export const registerBlock = (componentName: string, component: any) => {
  blockRegistry[componentName] = component
}

export type BlockProps = {
  block: Block
  editable: boolean
  onBlockChange: (block: Block) => void
}

export type MenuProps = {
  block: Block
  editor: Editor
  onBlockChange: (block: Block) => void
  hiddenTurn?: boolean
}

export default blockRegistry
