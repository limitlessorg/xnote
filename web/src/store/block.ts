import { Block } from 'models/block'
import { create } from 'zustand'

export interface IBlockStoreProps {
  block?: Block // 当前块
  blockItems: Block[]
  setBlock: (block: Block) => void
  setBlockItems: (blockItems: Block[]) => void
}

/**
 * 状态管理-块
 */
const useBlockStore = create<IBlockStoreProps>()((set) => ({
  block: undefined,
  blockItems: [],
  setBlock: (block: Block) => {
    set({ block })
  },
  setBlockItems: (blockItems: Block[]) => {
    set({ blockItems })
  }
}))

export default useBlockStore
