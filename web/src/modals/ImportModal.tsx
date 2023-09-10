import { Modal } from 'antd'
import React from 'react'
import {
  RiFileWordLine,
  RiHtml5Line,
  RiMarkdownLine,
  RiFile4Line
} from 'react-icons/ri'

type ImportModalProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

/**
 * 导入
 * @returns
 */
const ImportModal: React.FC<ImportModalProps> = ({ open, setOpen }) => {
  return (
    <Modal
      title="导入"
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      destroyOnClose={true}
      maskClosable={false}
      width={600}
      footer={null}
    >
      <div className="h-72">
        <div className="flex h-28">
          <div className="m-2 flex w-1/2 border-spacing-1 cursor-pointer rounded-lg border border-solid p-4 shadow-xl hover:bg-neutral-200">
            <div className="p-2 text-4xl">
              <RiMarkdownLine />
            </div>
            <div className="p-1 text-lg font-bold">Markdown</div>
          </div>
          <div className="m-2 flex w-1/2 border-spacing-1 cursor-pointer rounded-lg border border-solid p-4 shadow-xl hover:bg-neutral-200">
            <div className="p-2 text-4xl">
              <RiFile4Line />
            </div>
            <div className="p-1 text-lg font-bold">JSON</div>
          </div>
        </div>
        <div className="flex h-28">
          <div className="m-2 flex w-1/2 border-spacing-1 cursor-pointer rounded-lg border border-solid p-4 shadow-xl hover:bg-neutral-200">
            <div className="p-2 text-4xl">
              <RiHtml5Line />
            </div>
            <div className="p-1 text-lg font-bold">Html</div>
          </div>
          <div className="m-2 flex w-1/2 border-spacing-1 cursor-pointer rounded-lg border border-solid p-4 shadow-xl hover:bg-neutral-200">
            <div className="p-2 text-4xl">
              <RiFileWordLine />
            </div>
            <div className="p-1 text-lg font-bold">Word</div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ImportModal
