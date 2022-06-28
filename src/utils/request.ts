import HttpRequest from './axios'
import config from '@/config/index'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.prod

console.log(process.env.NODE_ENV)
const request = new HttpRequest(baseUrl)

export default request
