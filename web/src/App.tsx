import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import { ReactElement } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from 'router'
import useSettingStore, { settingToTheme } from 'store/setting'
import './App.less'

/**
 * Query 设置
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false
    }
  }
})

function App(): ReactElement {
  const { theme } = useSettingStore()
  return (
    <ConfigProvider locale={zhCN} theme={settingToTheme(theme)}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ConfigProvider>
  )
}

export default App
