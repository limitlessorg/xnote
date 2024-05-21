import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ThemeConfig, theme as antdTheme } from 'antd'

export interface ISettingStoreProps {
  theme: ITheme // 主题
  collapsed: boolean
  headerHeight: number // 头部高度
  siderWidth: number // 侧边栏宽度
  setTheme: (theme: ITheme) => void
  setCollapsed: (collapsed: boolean) => void
  setSiderWidth: (siderWidth: number) => void
}

export interface ITheme {
  mainTheme: 'default' | 'dark'
  colorPrimary: string
  borderRadius: number
  space: 'default' | 'compact'
}

/**
 * 默认主题设置
 */
export const defaultITheme: ITheme = {
  mainTheme: 'default',
  colorPrimary: '#1677ff',
  borderRadius: 4,
  space: 'default'
}

/**
 * 默认主题
 */
const defaultTheme: ThemeConfig = {
  components: {
    Layout: {
      colorBgHeader: '#ffffff'
    },
    Popover: {
      padding: 4
    }
  },
  token: { wireframe: false },
  algorithm: [antdTheme.defaultAlgorithm]
}

/**
 * 暗黑主题
 */
const darkTheme: ThemeConfig = {
  components: {
    Layout: {
      colorBgHeader: '#141414'
    },
    Popover: {
      padding: 4
    }
  },
  token: { wireframe: false },
  algorithm: [antdTheme.darkAlgorithm]
}

/**
 * 转化主题设置
 * @param theme 主题设置
 * @returns 主题
 */
export const settingToTheme = (theme: ITheme): ThemeConfig => {
  let themeConfig: ThemeConfig = defaultTheme
  if (theme.mainTheme == 'dark') {
    themeConfig = darkTheme
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  // 转化主题设置
  themeConfig.token = {
    ...themeConfig.token,
    ...{ colorPrimary: theme.colorPrimary, borderRadius: theme.borderRadius }
  }
  if (theme.space == 'compact') {
    if (themeConfig.algorithm instanceof Array) {
      themeConfig.algorithm.push(antdTheme.compactAlgorithm)
    }
  }
  return themeConfig
}

/**
 * 设置：主题、用户习惯等
 */

const useSettingStore = create<ISettingStoreProps>()(
  persist(
    (set) => ({
      theme: defaultITheme,
      collapsed: false,
      headerHeight: 56,
      siderWidth: 320,
      siderMenuWidth: 52,
      setTheme: (theme: ITheme) => {
        set({ theme })
      },
      setCollapsed: (collapsed: boolean) => {
        set({ collapsed })
      },
      setSiderWidth: (siderWidth: number) => {
        set({ siderWidth })
      }
    }),
    {
      name: 'setting-storage'
    }
  )
)

export default useSettingStore
