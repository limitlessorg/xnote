import { HeaderContext } from '@tanstack/react-table'
import { Divider, Input, Popover } from 'antd'
import {
  AiOutlineArrowRight,
  AiOutlineCalendar,
  AiOutlineCheckSquare,
  AiOutlineFile,
  AiOutlineNumber,
  AiOutlineSortAscending,
  AiOutlineSortDescending,
  AiOutlineUser,
  AiOutlineUserSwitch
} from 'react-icons/ai'
import {
  RiArrowDownSFill,
  RiFunctions,
  RiLink,
  RiListCheck2,
  RiListUnordered,
  RiLoaderLine,
  RiMailLine,
  RiNumber0,
  RiPhoneLine,
  RiText
} from 'react-icons/ri'
import { Col } from '.'
import React from 'react'

export type HeaderProps = {
  col: Col
  headerContext: HeaderContext<any, any>
}

/**
 * 列类型
 */
export enum ColType {
  String = 'string',
  Number = 'number',
  Select = 'select',
  MultiSelect = 'multiSelect',
  Status = 'status',
  Image = 'image',
  File = 'file',
  Link = 'link',
  Email = 'email',
  Phone = 'phone',
  Formula = 'formula',
  DateTime = 'dateTime',
  CreateTime = 'createTime',
  CreatedBy = 'createdBy',
  ModifiedTime = 'modifiedTime',
  ModifiedBy = 'modifiedBy',

  Category = 'category',
  Person = 'person',
  Corporation = 'corporation',
  Department = 'department',
  Team = 'team',
  Group = 'group',
  Role = 'role'
}

export const colMap: Record<string, { name: string; icon: React.ReactNode }> = {
  string: { name: '文本', icon: <RiText /> },
  number: { name: '数值', icon: <AiOutlineNumber /> },
  select: { name: '单选', icon: <RiListUnordered /> },
  multiSelect: { name: '多选', icon: <RiListCheck2 /> },
  status: { name: '状态', icon: <RiLoaderLine /> },
  image: { name: '图片', icon: <AiOutlineFile /> },
  file: { name: '文件', icon: <AiOutlineFile /> },
  link: { name: '链接', icon: <RiLink /> },
  email: { name: '邮箱', icon: <RiMailLine /> },
  phone: { name: '手机号', icon: <RiPhoneLine /> },
  formula: { name: '公式', icon: <RiFunctions /> },
  dateTime: { name: '日期', icon: <AiOutlineCalendar /> },
  createTime: { name: '创建时间', icon: <RiNumber0 /> },
  createdBy: { name: '创建者', icon: <RiNumber0 /> },
  modifiedTime: { name: '修改时间', icon: <RiNumber0 /> },
  modifiedBy: { name: '修改人', icon: <RiNumber0 /> },

  category: { name: '模型', icon: <AiOutlineUser /> },
  person: { name: '人员', icon: <AiOutlineUser /> },
  corporation: { name: '企业', icon: <AiOutlineUser /> },
  department: { name: '部门', icon: <AiOutlineUser /> },
  team: { name: '团队', icon: <AiOutlineUser /> },
  group: { name: '群组', icon: <AiOutlineUser /> },
  role: { name: '角色', icon: <AiOutlineUser /> }
}

const DataTableHeaderMenu: React.FC<HeaderProps> = ({ col, headerContext }) => {
  return (
    <div>
      <div className="flex p-1">
        <div className="pl-2">
          <Input
            size="small"
            placeholder="重命名"
            defaultValue={col.name}
            autoFocus={true}
            // onChange={(e) => {
            //   headerContext.table.options.meta?.updateCols(
            //     col.index,
            //     e.target.value
            //   )
            // }}
          />
        </div>
      </div>
      <div className="flex cursor-pointer justify-between p-1">
        <div>
          <AiOutlineArrowRight />
        </div>
      </div>
      <Divider className="m-0.5" />
      <div
        className="flex cursor-pointer"
        onClick={() => {
          headerContext.column.toggleSorting(false)
        }}
      >
        <div className="text-lg">
          <AiOutlineSortAscending />
        </div>
        <span className="pl-2">按 A 到 Z 排序</span>
      </div>
      <div
        className="flex cursor-pointer"
        onClick={() => {
          headerContext.column.toggleSorting(true)
        }}
      >
        <div className="text-lg">
          <AiOutlineSortDescending />
        </div>
        <span className="pl-2">按 Z 到 A 排序</span>
      </div>
    </div>
  )
}

const Header: React.FC<HeaderProps> = ({ col, headerContext }) => {
  return (
    <div className="group flex h-full cursor-pointer justify-between hover:bg-gray-200">
      <div className="px-2 py-1">{col.name}</div>
      <Popover
        className="group"
        placement="bottom"
        content={
          <DataTableHeaderMenu col={col} headerContext={headerContext} />
        }
        arrow={false}
        trigger={['click', 'contextMenu']}
        mouseEnterDelay={0}
        mouseLeaveDelay={0}
        onOpenChange={(visible) => {
          if (!visible) {
            console.log('TODO：修改配置')
          }
        }}
      >
        <div className="rounded py-1 px-2 opacity-0 hover:bg-neutral-300 group-hover:opacity-100">
          <RiArrowDownSFill />
        </div>
      </Popover>
    </div>
  )
}

export default React.memo(Header)
