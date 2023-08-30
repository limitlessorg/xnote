import React from 'react'

/**
 * 创建引导
 */
const CreateIndex: React.FC = () => {
  return (
    <div className="m-2">
      <div className="cursor-pointer rounded p-1 text-base hover:bg-slate-100">
        空白页(带图标)
      </div>
      <div className="cursor-pointer rounded p-1 text-base hover:bg-slate-100">
        空白页
      </div>
      <div className="cursor-pointer rounded p-1 text-base hover:bg-slate-100">
        选择模板
      </div>
      <div className="cursor-pointer rounded p-1 text-base hover:bg-slate-100">
        导入
      </div>
      <div className="p-1 text-neutral-500">数据表格</div>
      <div className="cursor-pointer rounded p-1 text-base hover:bg-slate-100">
        表格
      </div>
      <div className="cursor-pointer rounded p-1 text-base hover:bg-slate-100">
        看板
      </div>
      <div className="cursor-pointer rounded p-1 text-base hover:bg-slate-100">
        列表
      </div>
      <div className="cursor-pointer rounded p-1 text-base hover:bg-slate-100">
        时间轴
      </div>
      <div className="cursor-pointer rounded p-1 text-base hover:bg-slate-100">
        日历
      </div>
    </div>
  )
}

export default CreateIndex
