/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TreeToArrOptions {
  /** 深度项名，默认：`'deep'` */
  deepMapName?: string
  /** 扁平后数组的父数据项名，默认：`'parent'` */
  parentMapName?: string
  /** 源数据子项名，默认：`'children'` */
  childrenMapName?: string
  /** 是否移除 `children` 节点，默认：`true` */
  clearChildren?: boolean
  /** 转换成数组结构时回调 */
  cb?: (item: any, parent: any, deep: number) => void
}

export interface ArrToTreeOptions {
  /** 编号项名，默认：`'id'` */
  idMapName?: string
  /** 父编号项名，默认：`'pid'` */
  parentIdMapName?: string
  /** 子项名，默认：`'children'` */
  childrenMapName?: string
  /** 转换成树数据时回调 */
  cb?: (item: any) => void
}

export interface ArrToTreeNodeOptions {
  /** 编号项名，默认：`'id'` */
  idMapName?: string
  /** Key项名，默认：`'id'` */
  keyMapName?: string
  /** 父编号项名，默认：`'pid'` */
  parentIdMapName?: string
  /** 标题项名，默认：`'title'` */
  titleMapName?: string
  /** 设置为叶子节点项名，若数据源不存在时自动根据 `children` 值决定是否为叶子节点，默认：`'isLeaf'` */
  isLeafMapName?: string
  /** 节点 Checkbox 是否选中项名，默认：`'checked'` */
  checkedMapname?: string
  /** 节点本身是否选中项名，默认：`'selected'` */
  selectedMapname?: string
  /** 节点是否展开(叶子节点无效)项名，默认：`'expanded'` */
  expandedMapname?: string
  /** 设置是否禁用节点(不可进行任何操作)项名，默认：`'disabled'` */
  disabledMapname?: string
  /** 源数据子项名，默认：`'children'` */
  childrenMapName?: string
  /** 转换成树数据后，执行的递归回调 */
  cb?: (item: any, parent: any, deep: number) => void
}

export interface ArrayConfig {
  /** 深度项名，默认：`'deep'` */
  deepMapName?: string
  /** 扁平后数组的父数据项名，默认：`'parent'` */
  parentMapName?: string
  /** 编号项名，默认：`'id'` */
  idMapName?: string
  /** Key项名，默认：`'id'` */
  keyMapName?: string
  /** 父编号项名，默认：`'pid'` */
  parentIdMapName?: string
  /** 源数据子项名，默认：`'children'` */
  childrenMapName?: string
  /** 标题项名，默认：`'title'` */
  titleMapName?: string
  /** 节点 Checkbox 是否选中项名，默认：`'checked'` */
  checkedMapname?: string
  /** 节点本身是否选中项名，默认：`'selected'` */
  selectedMapname?: string
  /** 节点是否展开(叶子节点无效)项名，默认：`'expanded'` */
  expandedMapname?: string
  /** 设置是否禁用节点(不可进行任何操作)项名，默认：`'disabled'` */
  disabledMapname?: string
}

/**
 * 默认配置
 */
export const defaultArrayConfig: ArrayConfig = {
  deepMapName: 'deep',
  parentMapName: 'parent',
  idMapName: 'id',
  keyMapName: 'id',
  parentIdMapName: 'parentId',
  childrenMapName: 'children',
  titleMapName: 'name',
  checkedMapname: 'checked',
  selectedMapname: 'selected',
  expandedMapname: 'expanded',
  disabledMapname: 'disabled'
}

/**
 * 将树结构转换成数组结构
 */
export const treeToArr = (tree: any[], options?: TreeToArrOptions): any[] => {
  const opt = {
    deepMapName: defaultArrayConfig.deepMapName,
    parentMapName: defaultArrayConfig.parentMapName,
    childrenMapName: defaultArrayConfig.childrenMapName,
    clearChildren: true,
    cb: null,
    ...options
  } as TreeToArrOptions
  const result: any[] = []
  const inFn = (list: any[], parent: any, deep = 0) => {
    for (const i of list) {
      i[opt.deepMapName!] = deep
      i[opt.parentMapName!] = parent
      if (opt.cb) {
        opt.cb(i, parent, deep)
      }
      result.push(i)
      const children = i[opt.childrenMapName!]
      if (children != null && Array.isArray(children) && children.length > 0) {
        inFn(children, i, deep + 1)
      }
      if (opt.clearChildren) {
        delete i[opt.childrenMapName!]
      }
    }
  }
  inFn(tree, 1)
  return result
}

/**
 * 数组转换成树数据（严格模式，根节点的父ID为：null、0 或者指定rootIdSet）
 * @param arr 数组
 * @param options 选项
 * @param rootIdSet 根节点集合
 * @returns 树
 */
export const arrToTree = (
  arr: any[],
  options?: ArrToTreeOptions,
  rootIdSet?: Set<any>
): any[] => {
  const opt = {
    idMapName: defaultArrayConfig.idMapName,
    parentIdMapName: defaultArrayConfig.parentIdMapName,
    childrenMapName: defaultArrayConfig.childrenMapName,
    cb: null,
    ...options
  } as ArrToTreeOptions
  const tree: any[] = []
  const childrenOf: any = {}
  for (const item of arr) {
    const id = item[opt.idMapName!]
    const pid = item[opt.parentIdMapName!]
    childrenOf[id] = childrenOf[id] || []
    item[opt.childrenMapName!] = childrenOf[id]
    if (opt.cb) {
      opt.cb(item)
    }
    if (rootIdSet && rootIdSet.has(pid)) {
      tree.push(item)
    } else if (pid) {
      childrenOf[pid] = childrenOf[pid] || []
      childrenOf[pid].push(item)
    } else {
      tree.push(item)
    }
  }
  return tree
}

/**
 * 递归访问整个树
 */
export const visitTree = (
  tree: any[],
  cb: (item: any, parent: any, deep: number) => void,
  options?: {
    /** 子项名，默认：`'children'` */
    childrenMapName?: string
  }
) => {
  options = {
    childrenMapName: defaultArrayConfig.childrenMapName,
    ...options
  }
  const inFn = (data: any[], parent: any, deep: number) => {
    for (const item of data) {
      cb(item, parent, deep)
      const childrenVal = item[options!.childrenMapName!]
      if (childrenVal && childrenVal.length > 0) {
        inFn(childrenVal, item, deep + 1)
      }
    }
  }
  inFn(tree, null, 1)
}

/**
 * 数组转换成 `antd TreeNode` 数据源，通过 `options` 转化项名，也可以使用 `options.cb` 更高级决定数据项
 */
export const arrToTreeNode = (
  arr: any[],
  options?: ArrToTreeNodeOptions,
  rootIdSet?: Set<any>
): any[] => {
  const opt = {
    idMapName: defaultArrayConfig.idMapName,
    keyMapName: defaultArrayConfig.keyMapName,
    parentIdMapName: defaultArrayConfig.parentIdMapName,
    titleMapName: defaultArrayConfig.titleMapName,
    checkedMapname: defaultArrayConfig.checkedMapname,
    selectedMapname: defaultArrayConfig.selectedMapname,
    expandedMapname: defaultArrayConfig.expandedMapname,
    disabledMapname: defaultArrayConfig.disabledMapname,
    childrenMapName: defaultArrayConfig.childrenMapName,
    cb: null,
    ...options
  } as ArrToTreeNodeOptions
  const tree = arrToTree(
    arr,
    {
      idMapName: opt.idMapName,
      parentIdMapName: opt.parentIdMapName,
      childrenMapName: defaultArrayConfig.childrenMapName
    },
    rootIdSet
  )
  return treeToTreeNode(tree, opt)
}

/**
 * 树转换成 `Antd TreeNode` 数据源，通过 `options` 转化项名，也可以使用 `options.cb` 更高级决定数据项
 */
export const treeToTreeNode = (
  tree: any[],
  options?: ArrToTreeNodeOptions
): any[] => {
  const opt = {
    idMapName: defaultArrayConfig.idMapName,
    keyMapName: defaultArrayConfig.keyMapName,
    parentIdMapName: defaultArrayConfig.parentIdMapName,
    titleMapName: defaultArrayConfig.titleMapName,
    checkedMapname: defaultArrayConfig.checkedMapname,
    selectedMapname: defaultArrayConfig.selectedMapname,
    expandedMapname: defaultArrayConfig.expandedMapname,
    disabledMapname: defaultArrayConfig.disabledMapname,
    childrenMapName: defaultArrayConfig.childrenMapName,
    cb: null,
    ...options
  } as ArrToTreeNodeOptions
  visitTree(tree, (item: any, parent: any, deep: number) => {
    item.key = item[opt.keyMapName!]
    item.title = item[opt.titleMapName!]
    item.checked = item[opt.checkedMapname!]
    item.selected = item[opt.selectedMapname!]
    item.expanded = item[opt.expandedMapname!]
    item.disabled = item[opt.disabledMapname!]
    item.children = item[opt.childrenMapName!]
    item.isLeaf = !item.children || item.children.length === 0
    if (opt.cb) {
      opt.cb(item, parent, deep)
    }
  })
  return tree
}
