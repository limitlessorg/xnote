import { User } from 'models/user'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export enum SpaceType {
  User = 'user',
  Org = 'org',
  Team = 'team'
}

export const spaceTypeObject = { user: '个人', org: '企业', team: '团队' }

/**
 * 空间
 */
export type Space = {
  userId: string
  spaceId: string
  spaceType: SpaceType
  name?: string
  code?: string
  logo?: string
}

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
