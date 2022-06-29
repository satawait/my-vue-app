import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Canceler,
  AxiosError
} from 'axios'
import NProgress from 'nprogress'
import qs from 'qs'
import router from '@/routes'

const CancelToken = axios.CancelToken
const instance = axios.create()
console.log(router)

class HttpRequest {
  private baseUrl: string
  private pending: Record<string, Canceler>

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
    this.pending = {}
    this.interceptors(instance)
  }

  // 获取axios配置
  getInsideConfig(type?: string) {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': type === 'upload' ? 'multipart/form-data' : 'application/json;charset=utf-8'
      },
      timeout: 10000
    }
    return config
  }

  removePending(key: string, isRequest = false) {
    if (this.pending[key] && isRequest) {
      this.pending[key]('取消重复请求')
    }
    delete this.pending[key]
  }

  async errorHandle(err: AxiosError) {
    console.log(err.message)
    if (err.response?.status === 401) {
      localStorage.removeItem('authorization')
      router.push({ name: 'Login' })
    }
  }

  // 设定拦截器
  interceptors(instance: AxiosInstance) {
    instance.interceptors.request.use(
      (config) => {
        NProgress.start()
        const authorization = localStorage.getItem('authorization')
        // if (authorization) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${authorization}`
        }
        // }
        const key = config.url + '&' + config.method
        this.removePending(key, true)
        config.cancelToken = new CancelToken((c) => {
          this.pending[key] = c
        })
        return config
      },
      (err) => {
        this.errorHandle(err)
        return Promise.reject(err)
      }
    )

    // 响应请求的拦截器
    instance.interceptors.response.use(
      (res) => {
        console.log(res)
        NProgress.done()
        const key = res.config.url + '&' + res.config.method
        this.removePending(key)
        if (res.status === 200) {
          return Promise.resolve(res)
        } else if (res.status === 401) {
          localStorage.removeItem('authorization')
          router.push({ name: 'Login' })
        } else {
          return Promise.reject(res)
        }
      },
      (err) => {
        this.errorHandle(err)
        return Promise.reject(err)
      }
    )
  }

  // 创建实例
  async request<T>(options: AxiosRequestConfig, type?: string): Promise<T> {
    const newOptions = Object.assign(this.getInsideConfig(type), options)
    const res: AxiosResponse<T> = await instance(newOptions)
    return res.data
  }

  get<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const querys = qs.stringify(data)
    const options = Object.assign(
      {
        method: 'get',
        url: `${url}?${querys}`
      },
      config
    )
    return this.request(options)
  }

  post<T>(url: string, data?: unknown): Promise<T> {
    return this.request({
      method: 'post',
      url: url,
      data: data
    })
  }

  put<T>(url: string, data?: unknown): Promise<T> {
    return this.request({
      method: 'put',
      url: url,
      data: data
    })
  }

  delete<T>(url: string, data?: unknown): Promise<T> {
    return this.request({
      method: 'delete',
      url: url,
      data: data
    })
  }

  upload<T>(url: string, fileFormData: FormData): Promise<T> {
    return this.request(
      {
        method: 'post',
        url: url,
        data: fileFormData
      },
      'upload'
    )
  }

  download(url: string) {
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = url
    iframe.onload = function () {
      document.body.removeChild(iframe)
    }
    document.body.appendChild(iframe)
  }
}

export default HttpRequest
