import { PlusCircleOutlined, SaveOutlined } from '@ant-design/icons'
import {
  Avatar,
  Button,
  Input,
  Select,
  UploadFile,
  UploadProps,
  message
} from 'antd'
import ImgCrop from 'antd-img-crop'
import Upload, { RcFile, UploadChangeParam } from 'antd/es/upload'
import { Space, SpaceType } from 'models/space'
import React, { useState } from 'react'
import { patchSpace } from 'repo/space'
import useSpaceStore from 'store/space'
import { useDebounceFn } from '@ant-design/pro-utils'
import { DEFAULT_OSS_URL } from 'types'

/**
 * 空间设置
 */
const SpaceSetting: React.FC = () => {
  const { space, setSpaces, spaces, setSpace } = useSpaceStore()

  // 更新去抖
  const { run } = useDebounceFn(patchSpace, 500)

  const handleChange = (
    info: UploadChangeParam<UploadFile>,
    newSpace: Space
  ) => {
    if (info.file.status === 'uploading') {
      return
    }
    if (info.file.status === 'done') {
      newSpace = {
        ...newSpace,
        logo: info.file.response?.data?.url
      }
      if (space?.id === newSpace.id) {
        setSpace(newSpace)
      }
      setSpaces([...spaces.filter((s) => s.id !== newSpace.id), newSpace])
      run(newSpace).then((res) => {
        if (res) {
          message.success('保存成功！')
        }
      })
    }
  }

  const onChange = (newSpace: Space) => {
    if (space?.id === newSpace.id) {
      setSpace(newSpace)
    }
    setSpaces([...spaces.filter((s) => s.id !== newSpace.id), newSpace])
    run(newSpace).then((res) => {
      if (res) {
        message.success('保存成功！')
      }
    })
  }

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('只能上传 JPG或者PNG 格式的图片!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('图片必须小于 2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  return (
    <div className="h-full overflow-y-hidden hover:overflow-y-auto">
      {spaces.map((space) => {
        return (
          <div key={space.id} className="flex h-12 px-4">
            <div className="cursor-pointer px-1">
              <ImgCrop rotationSlider>
                <Upload
                  name="file"
                  showUploadList={false}
                  action={DEFAULT_OSS_URL}
                  headers={{ token: localStorage.getItem('token') as string }}
                  beforeUpload={beforeUpload}
                  onChange={(info) => handleChange(info, space)}
                >
                  {space?.logo ? (
                    <Avatar src={space?.logo} alt="avatar" />
                  ) : (
                    <div className="h-8 w-8">
                      <PlusCircleOutlined
                        rev={'default'}
                        style={{ fontSize: 30 }}
                      />
                    </div>
                  )}
                </Upload>
              </ImgCrop>
            </div>
            <div className="px-1">
              <Input
                value={space.name}
                className="w-52"
                onChange={(e) => onChange({ ...space, name: e.target.value })}
              />
            </div>
            <div className="px-1">
              <Select
                className="w-36"
                value={space.spaceType}
                options={[
                  { value: 'personal', label: '个人空间' },
                  { value: 'team', label: '团队空间' }
                ]}
                onChange={(e) => onChange({ ...space, spaceType: e })}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SpaceSetting
