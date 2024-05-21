import React from 'react'
import { Tabs } from 'antd'

/**
 * 数据视图
 */
const DataViews: React.FC = () => {
  const items = [
    {
      key: 'Biz',
      label: <div>业务视图</div>
    },
    {
      key: 'Card',
      label: <div>卡片视图</div>
    },
    {
      key: 'Pivot',
      label: <div>透视表</div>
    },
    {
      key: 'Chart',
      label: <div>图表</div>
    },
    {
      key: 'Gantt',
      label: <div>甘特图</div>
    },
    {
      key: 'Calendar',
      label: <div>日历视图</div>
    },
    {
      key: 'Album',
      label: <div>相册视图</div>
    }
  ]
  return <Tabs items={items} type="editable-card" />
}

export default DataViews
