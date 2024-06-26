import { Button, Input, Popover, Tabs, UploadProps, message } from 'antd'
import Dragger from 'antd/es/upload/Dragger'
import React, { useState } from 'react'
import { RiLinksLine, RiUpload2Line, RiVolumeUpFill } from 'react-icons/ri'
import { DEFAULT_OSS_URL } from 'types'
import { BlockProps, BlockType } from '.'

const allowedFileTypes = [
  'video/mp4',
  'video/webm',
  'video/ogg',
  'video/mpeg',
  'video/quicktime',
  'video/x-msvideo',
  'video/x-ms-wmv'
]

/**
 * 视频块内容
 */
type VideoContent = {
  type: 'oss' | 'link' // 类型：对象存储、外部链接
  url?: string // url路径
}

const VideoMenu: React.FC<BlockProps> = ({ block, onBlockChange }) => {
  const [url, setUrl] = useState<string>()
  // 内容变化
  const contentChange = (content: VideoContent) => {
    const newBlock = {
      ...block,
      content: content,
      blockType: BlockType.Video
    }
    onBlockChange(newBlock)
  }

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    action: DEFAULT_OSS_URL,
    accept: allowedFileTypes.join(','),
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    onChange(info) {
      const { status, response } = info.file
      if (status === 'done') {
        contentChange({ ...response.data, type: 'oss' })
      } else if (status === 'error') {
        message.warning(`视频上传失败.`)
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
          <p className="text-base">点击或者拖拽视频文件到此区域上传</p>
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
            placeholder="请粘贴视频链接"
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

/**
 * 视频块
 */
const VideoBlock: React.FC<BlockProps> = ({
  block,
  editable,
  onBlockChange
}) => {
  const content: VideoContent = block.content as VideoContent
  return (
    <>
      {content.url && (
        <video controls className="w-full">
          <source src={content.url}></source>
        </video>
      )}
      {!content.url && (
        <Popover
          placement="bottom"
          content={
            <VideoMenu
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
              <div className="px-4 pt-1 text-xl text-gray-400">
                <RiVolumeUpFill />
              </div>
              <div className="pt-2 pl-2 text-gray-400">添加视频</div>
            </div>
          </div>
        </Popover>
      )}
    </>
  )
}

export default VideoBlock
