import Page from 'pages/page'
import Home from 'pages/home'
import PassportLayout from 'pages/passport'
import PassportForget from 'pages/passport/Forget'
import PassportLogin from 'pages/passport/Login'
import PassportRegister from 'pages/passport/Register'
import { Navigate, useRoutes } from 'react-router-dom'
import PageContent from 'pages/page/PageContent'

/**
 * 路由信息
 */
export type RouteInfo = {
  icon?: React.ReactNode
  title?: string
  path: string
  children?: RouteInfo[]
  component?: React.ReactNode
  element?: React.ReactNode | null
}

export const routes: RouteInfo[] = [
  {
    path: '/',
    title: '登录',
    element: <Navigate to="/passport/login" />
  },
  {
    path: '/passport',
    title: '通行证',
    element: <PassportLayout />,
    children: [
      {
        path: '/passport/login',
        title: '登录',
        element: <PassportLogin />
      },
      {
        path: '/passport/register',
        title: '注册',
        element: <PassportRegister />
      },
      {
        path: '/passport/forget',
        title: '忘记密码',
        element: <PassportForget />
      }
    ]
  },
  {
    path: '/home/:id',
    title: '首页',
    element: <Home />
  },
  {
    path: '/page',
    title: '页面',
    element: <Page />,
    children: [
      {
        path: '/page/:id',
        title: '页面内容',
        element: <PageContent />
      }
    ]
  }
]

const Router = () => {
  return useRoutes(routes)
}

export default Router
