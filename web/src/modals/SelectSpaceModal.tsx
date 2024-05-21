import { Avatar, Button, Modal, Radio, Space } from 'antd'
import React, { useState } from 'react'
import useSpaceStore from 'store/space'

type SelectSpaceModalProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

/**
 * 选择空间
 */
const SelectSpaceModal: React.FC<SelectSpaceModalProps> = ({
  open,
  setOpen
}) => {
  const { spaces } = useSpaceStore()
  const [selectedSpace, setSelectedSpace] = useState()
  return (
    <Modal
      title="选择空间"
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      destroyOnClose={true}
      maskClosable={false}
      width={480}
      footer={
        <Button type="primary" disabled={!selectedSpace}>
          确定
        </Button>
      }
    >
      <div
        className="overflow-y-hidden hover:overflow-y-auto"
        style={{ height: '320px' }}
      >
        <div className="pt-4">
          <Radio.Group
            onChange={(value) => setSelectedSpace(value.target.value)}
          >
            <Space direction="vertical">
              {spaces.map((s) => {
                return (
                  <div key={s.id}>
                    <Radio value={s.id}>
                      <div className="flex">
                        <div className="p-1">
                          <Avatar src={s.logo} size={28} />
                        </div>
                        <div className="p-1 text-lg">{s.name}</div>
                      </div>
                    </Radio>
                  </div>
                )
              })}
            </Space>
          </Radio.Group>
        </div>
      </div>
    </Modal>
  )
}

export default SelectSpaceModal
