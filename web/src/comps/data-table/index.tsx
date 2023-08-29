import {
  CellContext,
  ColumnDef,
  ColumnResizeMode,
  CoreTableState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  HeaderContext,
  RowData,
  SortingState,
  TableState,
  useReactTable
} from '@tanstack/react-table'
import { CSSProperties, useState } from 'react'
import { RiAddLine, RiMoreLine } from 'react-icons/ri'
import Cell from './Cell'
import Header, { ColType } from './Header'
import './index.css'

const tableStyle: CSSProperties = {
  border: `1.5px solid lightgray`,
  borderRadius: '4px'
}

const bodyStyle: CSSProperties = {
  border: `1.5px solid lightgray`
}

const thStyle: CSSProperties = {
  borderBottom: `1.5px solid lightgray`,
  borderRight: `1.5px solid lightgray`
}

const tdStyle: CSSProperties = {
  borderBottom: `1.5px solid lightgray`,
  borderRight: `1.5px solid lightgray`
}

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void
    updateCols: (columnId: string, value: unknown) => void
  }
}

export type Col = {
  index: string
  name: string
  type: ColType
  options?: any
}

export type DataTableProps = {
  cols: Col[]
  data: any[]
}

/**
 * 数据表格组件
 * @param param0
 * @returns
 */
const DataTable: React.FC<DataTableProps> = ({ cols, data }) => {
  // 数据排序状态
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState({})

  const columnHelper = createColumnHelper<any>()

  let columns: ColumnDef<any, any>[] = cols.map((col) => {
    return columnHelper.accessor((row) => row[col.index], {
      id: col.index,
      cell: (cellContext: CellContext<any, any>) => (
        <Cell col={col} cellContext={cellContext} />
      ),
      header: (headerContext: HeaderContext<any, any>) => (
        <Header col={col} headerContext={headerContext} />
      ),
      footer: (info) => info.column.id
    })
  })
  // 添加列
  const addCol = () => {
    // const newCols =
  }
  // 增加列
  columns = [
    ...columns,
    {
      id: 'addCol',
      header: () => (
        <div className="flex">
          <div
            className="ml-2 cursor-pointer px-1 text-base hover:bg-slate-200"
            onClick={() => addCol()}
          >
            <RiAddLine />
          </div>
        </div>
      )
    }
  ]

  // Use the state and functions returned from useTable to build your UI
  const [columnResizeMode] = useState<ColumnResizeMode>('onChange')

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
      sorting
    },
    meta: {
      updateData: (rowIndex: number, columnId: any, value: any) => {
        data[rowIndex][columnId] = value
      },
      updateCols: (columnId: string, value: any) => {
        cols.forEach((col) => {
          if (col.index === columnId) {
            col.name = value
          }
        })
        cols.forEach((col) => {
          col.options = col.options || []
          const set = new Set(col.options)
          data.forEach((row) => {
            if (row[columnId]) {
              if (typeof row[columnId] === 'string') {
                set.add(row[columnId])
              } else {
                row[columnId].forEach((e: any) => {
                  set.add(e)
                })
              }
            }
          })
          if (col.index === columnId && value) {
            value.forEach((e: any) => {
              set.add(e)
            })
            col.options = [...set].map((opt) => {
              return { label: opt, value: opt }
            })
          }
        })
        setColumnVisibility({})
      }
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode
  })

  return (
    <div className="mb-1 overflow-x-hidden pb-3 hover:overflow-x-scroll hover:pb-0.5">
      <table
        {...{
          style: {
            ...tableStyle,
            width: table.getCenterTotalSize()
          }
        }}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="h-8">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{
                    ...thStyle,
                    position: 'relative',
                    width: header.getSize()
                  }}
                  className="h-full"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {header.column.getCanResize() && (
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className={`resizer ${
                        header.column.getIsResizing() ? 'isResizing' : ''
                      }`}
                    ></div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody style={bodyStyle}>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="h-8">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  {...{
                    style: {
                      ...tdStyle,
                      width: cell.column.getSize()
                    }
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable
