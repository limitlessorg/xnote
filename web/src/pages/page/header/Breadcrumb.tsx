import { Breadcrumb as Bread, Button, Popover } from 'antd'
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb'
import Icon from 'comps/Icon'
import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import useBreadcrumbStore from 'store/breadcrumb'
import { DataNode } from 'types'

const getBreadItems = (id: string, nodes: DataNode[]) => {
  let items: DataNode[] = []
  for (const node of nodes) {
    if (node.key == id) {
      items.push(node)
      return items
    }
    if (node.children) {
      const childrenItems = getBreadItems(id, node.children)
      if (childrenItems.length > 0) {
        items = [node, ...childrenItems]
      }
    }
  }
  return items
}

const renderPopoverContent = (items: DataNode[]) => {
  if (items && items.length > 0) {
    return (
      <div>
        {items.map((child: DataNode, index: number) => {
          return (
            <NavLink to={child.path} key={index} className="flex">
              <Button
                type="text"
                block
                className="text-left"
                icon={<Icon icon={child.icon} />}
              >
                {child.title as string}
              </Button>
            </NavLink>
          )
        })}
      </div>
    )
  } else {
    return undefined
  }
}

/**
 * 面包屑
 * @returns
 */
const Breadcrumb: React.FC = () => {
  const { id } = useParams()
  const { nodes } = useBreadcrumbStore()
  const bs = getBreadItems(id as string, nodes)
  const items: ItemType[] = bs.map((item) => {
    return {
      title: (
        <Popover
          content={renderPopoverContent(item.children || [])}
          placement="bottom"
          trigger={['hover']}
          arrow={false}
        >
          <NavLink to={`/${item.path}`}>
            <div className="flex">
              <div className="pr-1">
                <Icon icon={item.icon} />
              </div>
              <div>{item.title as string}</div>
            </div>
          </NavLink>
        </Popover>
      )
    }
  })

  return <Bread items={items} />
}
export default Breadcrumb
