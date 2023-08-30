/**
 * 空间类型
 */
export enum SpaceType {
  Personal = 'personal',
  Team = 'team'
}

/**
 * 空间
 */
export type Space = {
  id?: string
  spaceType: SpaceType
  name: string
  logo?: string
}

export const SpaceTypeObject = { personal: '个人', team: '团队' }
