import { Injectable } from '@nestjs/common';

export interface TreeToArrOptions {
  /** 深度项名，默认：`'deep'` */
  deepMapName?: string;
  /** 扁平后数组的父数据项名，默认：`'parent'` */
  parentMapName?: string;
  /** 源数据子项名，默认：`'children'` */
  childrenMapName?: string;
  /** 是否移除 `children` 节点，默认：`true` */
  clearChildren?: boolean;
  /** 转换成数组结构时回调 */
  cb?: (item: any, parent: any, deep: number) => void;
}

export interface ArrToTreeOptions {
  /** 编号项名，默认：`'id'` */
  idMapName?: string;
  /** 父编号项名，默认：`'pid'` */
  parentIdMapName?: string;
  /** 子项名，默认：`'children'` */
  childrenMapName?: string;
  /** 转换成树数据时回调 */
  cb?: (item: any) => void;
}

export interface ArrToTreeNodeOptions {
  /** 编号项名，默认：`'id'` */
  idMapName?: string;
  /** Key项名，默认：`'id'` */
  keyMapName?: string;
  /** 父编号项名，默认：`'pid'` */
  parentIdMapName?: string;
  /** 标题项名，默认：`'title'` */
  titleMapName?: string;
  /** 设置为叶子节点项名，若数据源不存在时自动根据 `children` 值决定是否为叶子节点，默认：`'isLeaf'` */
  isLeafMapName?: string;
  /** 节点 Checkbox 是否选中项名，默认：`'checked'` */
  checkedMapname?: string;
  /** 节点本身是否选中项名，默认：`'selected'` */
  selectedMapname?: string;
  /** 节点是否展开(叶子节点无效)项名，默认：`'expanded'` */
  expandedMapname?: string;
  /** 设置是否禁用节点(不可进行任何操作)项名，默认：`'disabled'` */
  disabledMapname?: string;
  /** 转换成树数据后，执行的递归回调 */
  cb?: (item: any, parent: any, deep: number) => void;
}

export interface ArrayConfig {
  /** 深度项名，默认：`'deep'` */
  deepMapName?: string;
  /** 扁平后数组的父数据项名，默认：`'parent'` */
  parentMapName?: string;
  /** 编号项名，默认：`'id'` */
  idMapName?: string;
  /** Key项名，默认：`'id'` */
  keyMapName?: string;
  /** 父编号项名，默认：`'pid'` */
  parentIdMapName?: string;
  /** 源数据子项名，默认：`'children'` */
  childrenMapName?: string;
  /** 标题项名，默认：`'title'` */
  titleMapName?: string;
  /** 节点 Checkbox 是否选中项名，默认：`'checked'` */
  checkedMapname?: string;
  /** 节点本身是否选中项名，默认：`'selected'` */
  selectedMapname?: string;
  /** 节点是否展开(叶子节点无效)项名，默认：`'expanded'` */
  expandedMapname?: string;
  /** 设置是否禁用节点(不可进行任何操作)项名，默认：`'disabled'` */
  disabledMapname?: string;
}

@Injectable()
export class TreeService {
  private c: ArrayConfig = {
    deepMapName: 'deep',
    parentMapName: 'parent',
    idMapName: 'id',
    keyMapName: 'id',
    parentIdMapName: 'parentId',
    childrenMapName: 'children',
    titleMapName: 'title',
    checkedMapname: 'checked',
    selectedMapname: 'selected',
    expandedMapname: 'expanded',
    disabledMapname: 'disabled',
  };

  /**
   * 将树结构转换成数组结构
   */
  treeToArr(tree: any[], options?: TreeToArrOptions): any[] {
    const opt = {
      deepMapName: this.c.deepMapName,
      parentMapName: this.c.parentMapName,
      childrenMapName: this.c.childrenMapName,
      clearChildren: true,
      cb: null,
      ...options,
    } as TreeToArrOptions;
    const result: any[] = [];
    const inFn = (list: any[], parent: any, deep = 0) => {
      for (const i of list) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        i[opt.deepMapName!] = deep;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        i[opt.parentMapName!] = parent;
        if (opt.cb) {
          opt.cb(i, parent, deep);
        }
        result.push(i);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const children = i[opt.childrenMapName!];
        if (
          children != null &&
          Array.isArray(children) &&
          children.length > 0
        ) {
          inFn(children, i, deep + 1);
        }
        if (opt.clearChildren) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          delete i[opt.childrenMapName!];
        }
      }
    };
    inFn(tree, 1);
    return result;
  }

  /**
   * 数组转换成树数据（严格模式，根节点的父ID为：null、0 或者指定rootIdSet）
   * @param arr 数组
   * @param options 选项
   * @param rootIdSet 根节点集合
   * @returns 树
   */
  arrToTree(
    arr: any[],
    options?: ArrToTreeOptions,
    rootIdSet?: Set<any>,
  ): any[] {
    const opt = {
      idMapName: this.c.idMapName,
      parentIdMapName: this.c.parentIdMapName,
      childrenMapName: this.c.childrenMapName,
      cb: null,
      ...options,
    } as ArrToTreeOptions;
    const tree: any[] = [];
    const childrenOf: any = {};
    for (const item of arr) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const id = item[opt.idMapName!];
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const pid = item[opt.parentIdMapName!];
      childrenOf[id] = childrenOf[id] || [];
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      item[opt.childrenMapName!] = childrenOf[id];
      if (opt.cb) {
        opt.cb(item);
      }
      if (rootIdSet && rootIdSet.has(pid)) {
        tree.push(item);
      } else if (pid) {
        childrenOf[pid] = childrenOf[pid] || [];
        childrenOf[pid].push(item);
      } else {
        tree.push(item);
      }
    }
    return tree;
  }

  /**
   * 递归访问整个树
   */
  visitTree(
    tree: any[],
    cb: (item: any, parent: any, deep: number) => void,
    options?: {
      /** 子项名，默认：`'children'` */
      childrenMapName?: string;
    },
  ): void {
    options = {
      childrenMapName: this.c.childrenMapName,
      ...options,
    };
    const inFn = (data: any[], parent: any, deep: number) => {
      for (const item of data) {
        cb(item, parent, deep);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const childrenVal = item[options!.childrenMapName!];
        if (childrenVal && childrenVal.length > 0) {
          inFn(childrenVal, item, deep + 1);
        }
      }
    };
    inFn(tree, null, 1);
  }
}
