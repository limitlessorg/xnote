/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'antd'

type R<T = any> = {
  success: boolean
  code: number
  msg: string
  data: T
}

// 导出Request类，可以用来自定义传递配置来创建实例
export class Http {
  // axios 实例
  instance: AxiosInstance
  // 基础配置，url和超时时间
  baseConfig: AxiosRequestConfig = { baseURL: '/api', timeout: 60000 }

  constructor(config: AxiosRequestConfig) {
    // 使用axios.create创建axios实例
    this.instance = axios.create(Object.assign(this.baseConfig, config))

    this.instance.interceptors.request.use(
      (config: any) => {
        // 一般会请求拦截里面加token，用于后端的验证
        const token = `Bearer ${localStorage.getItem('token')}`
        if (token && config.headers) {
          config.headers!.Authorization = token
        }
        return config
      },
      (err: any) => {
        // 请求错误，这里可以用全局提示框进行提示
        return Promise.reject(err)
      }
    )

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        const result = res.data as R
        // 后台接口提示：业务警告
        if (!result.success) {
          message.warning(result.msg)
        }
        // 直接返回数据
        return result.data
      },
      (err: any) => {
        // 这里用来处理http常见错误，进行全局提示
        let msg = ''
        switch (err.response.status) {
          case 400:
            msg = '请求错误(400)'
            break
          case 401:
            msg = '未授权，请重新登录(401)'
            // 这里可以做清空storage并跳转到登录页的操作
            // window.location.replace(`/passport/login`)
            break
          case 403:
            msg = '拒绝访问(403)'
            break
          case 404:
            msg = '请求出错(404)'
            break
          case 408:
            msg = '请求超时(408)'
            break
          case 500:
            msg = '服务器错误(500)'
            break
          case 501:
            msg = '服务未实现(501)'
            break
          case 502:
            msg = '网络错误(502)'
            break
          case 503:
            msg = '服务不可用(503)'
            break
          case 504:
            msg = '网络超时(504)'
            break
          case 505:
            msg = 'HTTP版本不受支持(505)'
            break
          default:
            msg = `连接出错(${err.response.status})!`
        }
        message.error(msg)
        // 这里是AxiosError类型，所以一般我们只reject我们需要的响应即可
        return Promise.reject(err.response)
      }
    )
  }

  // 定义请求方法
  public request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.instance.request(config)
  }

  public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get(url, config)
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.post(url, data, config)
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.put(url, data, config)
  }

  public patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.patch(url, data, config)
  }

  public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete(url, config)
  }

  public upload<T = any>(
    file: File,
    url = 'oss/upload',
    config: AxiosRequestConfig = {
      baseURL: '/',
      headers: { 'Content-Type': 'multipart/form-data' }
    }
  ): Promise<T> {
    const formData = new FormData()
    formData.append('file', file)
    return this.instance.post(url, formData, config)
  }
}

// 默认导出Request实例
export default new Http({})
