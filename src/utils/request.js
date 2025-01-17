import axios from 'axios'
import { getToken, removeToken } from './token'
import { createBrowserHistory } from 'history';

export const request = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})

// 创建自定义的 history 对象
const history = createBrowserHistory();


// 添加请求拦截器
request.interceptors.request.use((config)=> {
    // 自动携带 token
    const token = getToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  }, (error)=> {
    return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use((response)=> {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response
  }, (error)=> {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.response.status === 401) {
      removeToken()
      history.push('/login');
      window.location.reload()
    }
    return Promise.reject(error)
})
