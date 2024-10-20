import axios from 'axios'
import { ElMessage, ElLoading } from 'element-plus'
import { TOKEN } from './constant'

const baseURL = '/api'

const request = axios.create({
  baseURL,
  timeout: 30000
})

let loadingInstance
let requestCount = 0

function startLoading() {
  if (requestCount === 0) {
    loadingInstance = ElLoading.service({
      lock: false,
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  }
  requestCount++
}

function endLoading() {
  requestCount--
  if (requestCount === 0) {
    loadingInstance.close()
  }
}

function handleResponseError(error) {
  const data = error.response?.data
  if (data) {
    if (data.statusCode === 400) {
      const message = data.errors?.message[0] || '请求错误'
      ElMessage.error(message)
    } else if (data.statusCode === 401) {
      ElMessage.error(data.message || '请重新登录')
      window.localStorage.clear()
      router.push('/login')
    } else if (data.statusCode === 500) {
      ElMessage.error(data.message || '服务器错误')
    } else {
      ElMessage.error(data.message || '网络错误')
    }
  } else {
    ElMessage.error('网络错误')
  }
  endLoading()
  return Promise.reject(error)
}

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN)
    if (token) {
      config.headers['X-Token'] = token
      config.headers.Authorization = `Bearer ${token}`
    }
    startLoading()
    return config
  },
  (error) => {
    endLoading()
    console.error("请求出错", error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    endLoading()
    const data = response.data
    if (data.code === 200) {
      return data
    } else {
      if (data.data === '用户未登录') {
        window.localStorage.clear()
        window.location.reload()
      }
      ElMessage.error(data.data)
      return Promise.reject(data)
    }
  },
  (error) => handleResponseError(error)
)

const requestMethod = {
  get(url, params = {}, config = {}) {
    return request.get(url, { params, ...config })
  },
  post(url, data = {}, config = {}) {
    return request.post(url, data, config)
  }
}

export default requestMethod
