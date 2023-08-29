import React, { useState } from 'react'
import ReactEcharts from 'echarts-for-react'
import { BlockProps, BlockType } from '..'
import { RiMoreFill } from 'react-icons/ri'
import { Button, Dropdown, Popover } from 'antd'
import {
  SettingOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons'

/**
 * 图表块
 */
const ChartBlock: React.FC<BlockProps> = ({
  block,
  editable,
  onBlockChange
}) => {
  const options = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      }
    ],
    tooltip: {
      trigger: 'axis'
    }
  }

  return (
    <div>
      <div className="group h-8">
        <div className="flex justify-between px-2">
          <div>图表</div>
          <Popover
            placement="leftBottom"
            arrow={false}
            content={
              <div>
                <div>
                  <Button
                    type="text"
                    block
                    className="text-left"
                    icon={<SettingOutlined rev={'default'} />}
                  >
                    配置
                  </Button>
                </div>
                <div>
                  <Button
                    type="text"
                    block
                    className="text-left"
                    icon={<EditOutlined rev={'default'} />}
                  >
                    重命名
                  </Button>
                </div>
                <div>
                  <Button
                    type="text"
                    block
                    className="text-left"
                    icon={<DeleteOutlined rev={'default'} />}
                  >
                    删除
                  </Button>
                </div>
              </div>
            }
          >
            <div className="cursor-pointer text-lg opacity-0 group-hover:opacity-100">
              <RiMoreFill />
            </div>
          </Popover>
        </div>
      </div>
      <div className="p-2">
        <ReactEcharts option={options} />
      </div>
    </div>
  )
}

export default ChartBlock
