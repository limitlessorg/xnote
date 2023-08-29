import { Button, Input, Popover, Tabs, UploadProps, message } from 'antd'
import Dragger from 'antd/es/upload/Dragger'
import React, { useState } from 'react'
import { RiFileAddFill, RiLinksLine, RiUpload2Line } from 'react-icons/ri'
import { BlockProps, BlockType } from '.'

/**
 * 文件块内容
 */
type FileContent = {
  type: 'oss' | 'link' // 类型：对象存储、外部链接
  url?: string // url路径
  name?: string // 文件名
  size?: number // 文件大小
}

const FileMenu: React.FC<BlockProps> = ({ block, onBlockChange }) => {
  const [url, setUrl] = useState<string>()
  // 内容变化
  const contentChange = (content: FileContent) => {
    const newBlock = {
      ...block,
      content: content,
      blockType: BlockType.File
    }
    onBlockChange(newBlock)
  }
  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    action: '/oss/upload',
    onChange(info) {
      const { status, response } = info.file
      if (status === 'done') {
        contentChange({ ...response.data, type: 'oss' })
      } else if (status === 'error') {
        message.warning(`音频上传失败.`)
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    }
  }

  const items = [
    {
      key: 'upload',
      label: (
        <div className="flex">
          <div className="text-lg">
            <RiUpload2Line />
          </div>
          <div className="pl-1">上传</div>
        </div>
      ),
      children: (
        <Dragger {...uploadProps}>
          <p className="text-xl">
            <RiUpload2Line />
          </p>
          <p className="text-base">点击或者拖拽文件到此区域上传</p>
        </Dragger>
      )
    },
    {
      key: 'link',
      label: (
        <div className="flex">
          <div className="text-lg">
            <RiLinksLine />
          </div>
          <div className="pl-1">链接</div>
        </div>
      ),
      children: (
        <div>
          <Input
            defaultValue={block.content.url}
            placeholder="请粘贴文件链接"
            onChange={(e) => setUrl(e.target.value)}
            onPressEnter={() => {
              contentChange({ url, type: 'link' })
            }}
          />
          <div className="py-2">
            <Button
              block
              type="primary"
              onClick={() => contentChange({ url, type: 'link' })}
            >
              确定
            </Button>
          </div>
        </div>
      )
    }
  ]
  return (
    <div className="w-80">
      <Tabs centered size="small" items={items} />
    </div>
  )
}

const FileBlock: React.FC<BlockProps> = ({
  block,
  editable,
  onBlockChange
}) => {
  const content: FileContent = block.content as FileContent
  return (
    <>
      {content.url && (
        <div
          className="w-full cursor-pointer rounded py-1.5 px-1 text-base hover:bg-slate-100"
          onClick={() => {
            window.open(content.url)
          }}
        >
          {content.name}
        </div>
      )}
      {!content.url && (
        <Popover
          placement="bottom"
          content={
            <FileMenu
              block={block}
              onBlockChange={onBlockChange}
              editable={editable}
            />
          }
          trigger="click"
          arrow={true}
        >
          <div className="mb-1 h-12 cursor-pointer rounded bg-gray-100">
            <div className="flex border p-2">
              <div className="px-4 pt-1 text-2xl text-gray-400">
                <RiFileAddFill />
              </div>
              <div className="pt-2 pl-2 text-gray-400">上传文件</div>
            </div>
          </div>
        </Popover>
      )}
    </>
  )
}

export default FileBlock
