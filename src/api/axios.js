import axios from 'axios'
import JSONBig from 'json-bigint'
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/',
  transformResponse: [(data) => {
    if (data) {
      return JSONBig.parse(data)
    }
    return data
  }]
})

instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const user = window.sessionStorage.getItem('73toutiao')
  if (user) {
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(user).token
    }
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么

  return response
}, function (error) {
  // 对响应错误做点什么
  if (error.response.status === 401) {
    location.hash = '#/login'
  }

  return Promise.reject(error)
})

export default instance
