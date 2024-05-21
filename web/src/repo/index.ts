export * from './auth'
export * from './block'
export * from './category'
export * from './space'
export * from './template'
export * from './user'

/**
 * Store 域
 */
export enum Domain {
  User = 'user',
  Company = 'company',
  All = 'all'
}

/**
 * 获取空间 Space
 * @returns
 */
export function getSpace(): any {
  const spaceStr = localStorage.getItem('space')
  if (spaceStr) {
    return JSON.parse(spaceStr)
  }
}

/**
 * 获取 Store 域
 * @returns
 */
export function getDomain(): Domain {
  return getSpace()?.type || Domain.User
}

/**
 * 获取 spaceId
 * @returns
 */
export function getSpaceId(): string {
  return getSpace()?.id || ''
}
