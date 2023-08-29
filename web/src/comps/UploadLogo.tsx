import { PlusOutlined } from '@ant-design/icons'
import { Upload, message } from 'antd'
import ImgCrop from 'antd-img-crop'
import { RcFile, UploadProps } from 'antd/es/upload'

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

export type UploadLogoProp = {
  logo?: string
  handleChange: UploadProps['onChange']
}

/**
 * 上传Logo
 */
const UploadLogo: React.FC<UploadLogoProp> = ({ logo, handleChange }) => {
  return (
    <ImgCrop rotationSlider>
      <Upload
        name="file"
        listType="picture-card"
        showUploadList={false}
        action="/oss/upload"
        headers={{ token: localStorage.getItem('token') as string }}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {logo ? (
          <img src={logo} alt="avatar" className="w-full" />
        ) : (
          <div>
            <PlusOutlined rev={'default'} />
            <div>Logo</div>
          </div>
        )}
      </Upload>
    </ImgCrop>
  )
}

export default UploadLogo
