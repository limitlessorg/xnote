import { Button, Image, Input, Popover, Tabs, UploadProps, message } from 'antd'
import Dragger from 'antd/es/upload/Dragger'
import React, { useState } from 'react'
import {
  RiImageAddFill,
  RiLinksLine,
  RiSearchLine,
  RiUpload2Line
} from 'react-icons/ri'
import { BlockProps, BlockType } from '.'
import { DEFAULT_OSS_URL } from 'types'

const allowedFileTypes = [
  'image/png',
  'image/jpeg',
  'image/gif',
  'image/svg',
  'image/raw'
]

/**
 * 图片块内容
 */
type ImageContent = {
  type: 'oss' | 'link' // 类型：对象存储、外部链接
  url?: string // url路径
}

const ImageMenu: React.FC<BlockProps> = ({ block, onBlockChange }) => {
  const [url, setUrl] = useState<string>()
  // 内容变化
  const contentChange = (content: ImageContent) => {
    const newBlock = {
      ...block,
      content: content,
      blockType: BlockType.Image
    }
    onBlockChange(newBlock)
  }

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    action: DEFAULT_OSS_URL,
    accept: allowedFileTypes.join(','),
    headers: { token: localStorage.getItem('token') as string },
    onChange(info) {
      const { status, response } = info.file
      if (status === 'done') {
        contentChange({ ...response.data, type: 'oss' })
      } else if (status === 'error') {
        message.error(`图片上传失败.`)
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
          <p className="text-base">点击或者拖拽图片到此区域上传</p>
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
            placeholder="请粘贴图片链接"
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
    },
    {
      key: 'search',
      label: (
        <div className="flex">
          <div className="text-lg">
            <RiSearchLine />
          </div>
          <div className="pl-1">搜索</div>
        </div>
      ),
      children: (
        <div>
          <Input placeholder="搜索图片" />
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

/**
 * 图片块
 */
const ImageBlock: React.FC<BlockProps> = ({
  block,
  editable,
  onBlockChange
}) => {
  const content: ImageContent = block.content as ImageContent
  return (
    <div>
      {content.url && (
        <img
          className="h-full w-full object-contain"
          src={content.url}
          alt={content.url}
        />
      )}
      {!content.url && (
        <Popover
          placement="bottom"
          content={
            <ImageMenu
              block={block}
              editable={editable}
              onBlockChange={onBlockChange}
            />
          }
          trigger="click"
          arrow={true}
        >
          <div className="mb-1 h-12 cursor-pointer rounded bg-gray-100">
            <div className="flex border p-2">
              <div className="px-4 pt-1 text-2xl text-gray-400">
                <RiImageAddFill />
              </div>
              <div className="pt-2 pl-2 text-gray-400">添加图片</div>
            </div>
          </div>
        </Popover>
      )}
    </div>
  )
}

export default ImageBlock
