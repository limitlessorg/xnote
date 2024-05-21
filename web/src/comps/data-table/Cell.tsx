import { CellContext } from '@tanstack/react-table'
import { Input, InputNumber, Select } from 'antd'
import { Col } from '.'
import { ColType } from './Header'
import React from 'react'

export type CellProps = {
  col: Col
  cellContext: CellContext<any, any>
}

const Cell: React.FC<CellProps> = ({ col, cellContext }) => {
  const renderCell = () => {
    switch (col.type) {
      case ColType.String:
        return (
          <Input
            defaultValue={cellContext.getValue()}
            size="small"
            bordered={false}
            onBlur={(e) => {
              const {
                row: { index },
                column: { id },
                table
              } = cellContext
              if (e.target.value !== cellContext.getValue()) {
                table.options.meta?.updateData(index, id, e.target.value)
              }
            }}
          />
        )
      case ColType.Number:
        return (
          <InputNumber
            defaultValue={cellContext.getValue()}
            size="small"
            style={{ width: '100%' }}
            bordered={false}
            onBlur={(e) => {
              const {
                row: { index },
                column: { id },
                table
              } = cellContext
              if (Number(e.target.value) !== cellContext.getValue()) {
                table.options.meta?.updateData(
                  index,
                  id,
                  Number(e.target.value)
                )
              }
            }}
          />
        )
      case ColType.Select:
        return (
          <Select
            defaultValue={cellContext.getValue()}
            size="small"
            style={{ width: '100%' }}
            bordered={false}
            allowClear={true}
            mode={'tags'}
            options={col.options || []}
            onChange={(value) => {
              const {
                row: { index },
                column: { id },
                table
              } = cellContext
              table.options.meta?.updateData(index, id, value)
              table.options.meta?.updateCols(id, value)
            }}
          />
        )
      default:
        return <>{cellContext.getValue()}</>
    }
  }
  return <>{renderCell()}</>
}

export default React.memo(Cell)
