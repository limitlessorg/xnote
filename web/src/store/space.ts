import { Space } from 'models/space'
import { User } from 'models/user'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ISpaceStoreProps {
  user?: User
  space?: Space
  spaces: Space[]
  setUser: (user: User) => void
  setSpace: (space: Space) => void
  setSpaces: (spaces: Space[]) => void
}

/**
 * 状态管理-空间
 */
const useSpaceStore = create<ISpaceStoreProps>()(
  persist(
    (set) => ({
      user: undefined,
      space: undefined,
      spaces: [],
      setUser: (user: User) => {
        set({ user })
      },
      setSpace: (space: Space) => {
        set({ space })
      },
      setSpaces: (spaces: Space[]) => {
        set({ spaces })
      }
    }),
    {
      name: 'space-storage'
    }
  )
)

export default useSpaceStore
