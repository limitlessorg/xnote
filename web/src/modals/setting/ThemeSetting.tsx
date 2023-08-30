import { Button, ColorPicker, Form, InputNumber, Radio } from 'antd'
import React, { useState } from 'react'
import useSettingStore, { ITheme, defaultITheme } from 'store/setting'

/**
 * 主题设置
 */
const ThemeSetting: React.FC = () => {
  const { theme, setTheme } = useSettingStore()
  const [colorPrimary, setColorPrimary] = useState<string>(theme.colorPrimary)
  const onFinish = (theme: ITheme) => {
    setTheme({ ...theme, colorPrimary })
    window.location.reload()
  }
  const reset = () => {
    setTheme(defaultITheme)
    window.location.reload()
  }
  return (
    <Form<ITheme>
      initialValues={theme}
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      layout="horizontal"
    >
      <Form.Item label="主题" name="mainTheme">
        <Radio.Group>
          <Radio value="default">默认</Radio>
          <Radio value="dark">暗黑</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="主色" name="colorPrimary">
        <ColorPicker
          size="large"
          value={colorPrimary}
          onChange={(value) => setColorPrimary(value.toHexString())}
        />
      </Form.Item>
      <Form.Item label="圆角" name="borderRadius">
        <InputNumber addonAfter={<span>px</span>} max={16} min={0} />
      </Form.Item>
      <Form.Item label="宽松度" name="space">
        <Radio.Group>
          <Radio value="default">默认</Radio>
          <Radio value="compact">紧凑</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item className="text-right">
        <Button type="primary" htmlType="submit" className="mr-2">
          确定
        </Button>
        <Button htmlType="button" onClick={reset} className="ml-2">
          重置
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ThemeSetting
