/*
  请求模块
*/
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 接口的基础路径
})

// 请求拦截器

// 相应拦截器

export default request
