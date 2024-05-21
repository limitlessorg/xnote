import { Button, Input, Popover, Tabs, UploadProps, message } from 'antd'
import Dragger from 'antd/es/upload/Dragger'
import React, { useState } from 'react'
import { RiLinksLine, RiUpload2Line, RiVolumeUpFill } from 'react-icons/ri'
import { BlockProps, BlockType } from '.'
import { DEFAULT_OSS_URL } from 'types'

const allowedFileTypes = [
  'audio/mpeg',
  'audio/wav',
  'audio/aac',
  'audio/flac',
  'audio/ogg',
  'audio/mp3',
  'audio/midi',
  'audio/x-aiff',
  'audio/x-m4a',
  'audio/webm'
]

/**
 * 音频块内容
 */
type AudioContent = {
  type: 'oss' | 'link' // 类型：对象存储、外部链接
  url?: string // url路径
}

const AudioMenu: React.FC<BlockProps> = ({ block, onBlockChange }) => {
  const [url, setUrl] = useState<string>()
  // 内容变化
  const contentChange = (content: AudioContent) => {
    const newBlock = {
      ...block,
      content: content,
      blockType: BlockType.Audio
    }
    onBlockChange(newBlock)
  }

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    action: DEFAULT_OSS_URL,
    accept: allowedFileTypes.join(','),
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
          <p className="text-base">点击或者拖拽音频文件到此区域上传</p>
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
            placeholder="请粘贴音频链接"
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
 * 音频块
 */
const AudioBlock: React.FC<BlockProps> = ({
  block,
  editable,
  onBlockChange
}) => {
  const content: AudioContent = block.content as AudioContent
  return (
    <>
      {content.url && (
        <audio controls className="w-full">
          <source src={content.url} type="audio/mpeg"></source>
        </audio>
      )}
      {!content.url && (
        <Popover
          placement="bottom"
          content={
            <AudioMenu
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
              <div className="pt-2 pl-2 text-gray-400">添加音频</div>
            </div>
          </div>
        </Popover>
      )}
    </>
  )
}

export default AudioBlock
