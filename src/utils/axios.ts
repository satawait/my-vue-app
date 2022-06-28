import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Canceler,
  AxiosError
} from 'axios'
import NProgress from 'nprogress'

const CancelToken = axios.CancelToken
const instance = axios.create()
interface HttpResponse<T> {
  code: number
  data?: T
  msg: string
  err?: string
}
interface FileFormData extends FormData {
  file: File
}

class HttpRequest {
  private baseUrl: string
  private pending: Record<string, Canceler>

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
    this.pending = {}
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
  }

  // 设定拦截器
  interceptors(instance: AxiosInstance) {
    instance.interceptors.request.use(
      (config) => {
        NProgress.start()
        const token = window.localStorage.getItem('token')
        if (token) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`
          }
        }
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
        NProgress.done()
        const key = res.config.url + '&' + res.config.method
        this.removePending(key)
        if (res.status === 200) {
          return Promise.resolve(res.data)
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
  request(options: AxiosRequestConfig, type?: string) {
    const newOptions = Object.assign(this.getInsideConfig(type), options)
    this.interceptors(instance)
    return instance(newOptions)
  }

  get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> | Promise<HttpResponse<T>> {
    const options = Object.assign(
      {
        method: 'get',
        url: url
      },
      config
    )
    return this.request(options)
  }

  post<T>(url: string, data?: unknown): Promise<AxiosResponse> | Promise<HttpResponse<T>> {
    return this.request({
      method: 'post',
      url: url,
      data: data
    })
  }

  upload<T>(
    url: string,
    fileFormData: FileFormData
  ): Promise<AxiosResponse> | Promise<HttpResponse<T>> {
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
