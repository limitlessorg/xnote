import Editor from '@monaco-editor/react'
import { Select } from 'antd'
import React, { useState } from 'react'
import { BlockProps, BlockType } from '.'

// 语言配置
const languageoptions = [
  { value: 'TypeScript', label: 'TypeScript' },
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'CSS', label: 'CSS' },
  { value: 'LESS', label: 'LESS' },
  { value: 'SCSS', label: 'SCSS' },
  { value: 'JSON', label: 'JSON' },
  { value: 'HTML', label: 'HTML' },
  { value: 'XML', label: 'XML' },
  { value: 'PHP', label: 'PHP' },
  { value: 'C#', label: 'C#' },
  { value: 'C++', label: 'C++' },
  { value: 'Razor', label: 'Razor' },
  { value: 'Markdown', label: 'Markdown' },
  { value: 'Diff', label: 'Diff' },
  { value: 'Java', label: 'Java' },
  { value: 'VB', label: 'VB' },
  { value: 'CoffeeScript', label: 'CoffeeScript' },
  { value: 'Handlebars', label: 'Handlebars' },
  { value: 'Pug', label: 'Pug' },
  { value: 'F#', label: 'F#' },
  { value: 'Lua', label: 'Lua' },
  { value: 'Powershell', label: 'Powershell' },
  { value: 'Python', label: 'Python' },
  { value: 'Ruby', label: 'Ruby' },
  { value: 'SASS', label: 'SASS' },
  { value: 'R', label: 'R' },
  { value: 'Objective-C', label: 'Objective-C' }
]

/**
 * 代码编辑器块内容(默认配置)
 */
export class CodeEditorContent {
  type = 'code'
  value = ''
  language = 'Typescript'
  theme: 'light' | 'vs-dark' = 'light'
}

/**
 * 代码编辑器
 * @returns
 */
const CodeEditorBlock: React.FC<BlockProps> = ({
  block,
  editable = false,
  onBlockChange
}) => {
  const [content, setContent] = useState<CodeEditorContent>(
    block.content || new CodeEditorContent()
  )

  // TODO 增加主题色、保存Content数据
  const handleEditorChange = (content: CodeEditorContent) => {
    const newBlock = {
      ...block,
      blockType: BlockType.CodeEditor,
      content
    }
    onBlockChange(newBlock)
  }
  return (
    <div className="group rounded bg-neutral-100">
      {editable && (
        <div className="flex justify-between">
          <div></div>
          <div className="m-1 opacity-0 group-hover:opacity-100">
            <Select
              size="small"
              value={content.language}
              bordered={false}
              style={{ width: 120 }}
              options={languageoptions}
              onSelect={(language: string) => {
                const newContent = { ...content, ...{ language } }
                setContent(newContent)
                handleEditorChange(newContent)
              }}
            />
            <Select
              size="small"
              value={content.theme}
              bordered={false}
              style={{ width: 80 }}
              options={[
                { value: 'light', label: '明亮' },
                { value: 'vs-dark', label: '暗黑' }
              ]}
              onSelect={(theme: 'light' | 'vs-dark') => {
                const newContent = { ...content, theme }
                setContent(newContent)
                handleEditorChange(newContent)
              }}
            />
          </div>
        </div>
      )}
      <Editor
        height="480px"
        language={content.language}
        theme={content.theme}
        value={content.value}
        onChange={(value) => {
          const newContent = { ...content, value: value || '' }
          setContent(newContent)
          handleEditorChange(newContent)
        }}
        options={{
          minimap: {
            enabled: false // 是否启用预览图
          },
          readOnly: !editable
        }}
      />
    </div>
  )
}
export default CodeEditorBlock
