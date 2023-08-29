import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * 获取路径深度的 pathKey
 * @param pathDepth 路径深度
 * @returns { pathKey, lastPathKey}
 */
export function usePathKey(pathDepth?: number) {
  const location = useLocation()
  const { pathKey, lastPathKey } = useMemo(() => {
    const pathArray = location.pathname.split('/')
    return {
      pathKey: pathArray[pathDepth || 1],
      lastPathKey: pathArray[pathArray.length - 1]
    }
  }, [location, pathDepth])
  return { pathKey, lastPathKey }
}
