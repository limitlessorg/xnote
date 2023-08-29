import React from 'react'
import { Button, Drawer, Form, Input, InputNumber, Radio } from 'antd'
import useSettingStore, { ITheme, defaultITheme } from 'store/setting'

interface IThemeDrawerProps {
  open: boolean
  setOpen: (open: boolean) => void
}

/**
 * 主题设置抽屉
 */
const ThemeSettingDrawer: React.FC<IThemeDrawerProps> = ({ open, setOpen }) => {
  const { theme, setTheme } = useSettingStore()
  const onFinish = (theme: ITheme) => {
    setTheme(theme)
    setOpen(false)
  }
  const reset = () => {
    setTheme(defaultITheme)
  }
  return (
    <>
      <Drawer
        title="主题设置"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
        width={520}
      >
        <Form<ITheme> initialValues={theme} onFinish={onFinish}>
          <Form.Item label="主题" name="mainTheme">
            <Radio.Group>
              <Radio value="default">默认</Radio>
              <Radio value="dark">暗黑</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="主色" name="colorPrimary">
            <Input type="color" />
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
      </Drawer>
    </>
  )
}

export default ThemeSettingDrawer
