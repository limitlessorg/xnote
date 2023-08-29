import React from 'react'
import { RiFileWordLine, RiHtml5Line, RiMarkdownLine } from 'react-icons/ri'

/**
 * 导入
 * @returns
 */
const Import: React.FC = () => {
  return (
    <div className="h-72">
      <div className="flex h-28">
        <div className="m-2 flex w-1/2 border-spacing-1 cursor-pointer border border-solid p-4 shadow-xl hover:bg-neutral-200">
          <div className="p-2 text-4xl">
            <RiMarkdownLine />
          </div>
          <div className="p-1 text-lg font-bold">Markdown</div>
        </div>
        <div className="m-2 flex w-1/2 border-spacing-1 cursor-pointer border border-solid p-4 shadow-xl hover:bg-neutral-200">
          <div className="p-2 text-4xl">
            <RiMarkdownLine />
          </div>
          <div className="p-1 text-lg font-bold">CSV</div>
        </div>
      </div>
      <div className="flex h-28">
        <div className="m-2 flex w-1/2 border-spacing-1 cursor-pointer border border-solid p-4 shadow-xl hover:bg-neutral-200">
          <div className="p-2 text-4xl">
            <RiHtml5Line />
          </div>
          <div className="p-1 text-lg font-bold">Html</div>
        </div>
        <div className="m-2 flex w-1/2 border-spacing-1 cursor-pointer border border-solid p-4 shadow-xl hover:bg-neutral-200">
          <div className="p-2 text-4xl">
            <RiFileWordLine />
          </div>
          <div className="p-1 text-lg font-bold">Word</div>
        </div>
      </div>
    </div>
  )
}

export default Import
