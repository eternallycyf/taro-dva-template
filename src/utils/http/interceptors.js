import Taro from "@tarojs/taro"
import { pageToLogin } from "./utils"
import { HTTP_STATUS } from './config'

const customInterceptor = (chain) => {

  const requestParams = chain.requestParams

  return chain.proceed(requestParams).then(res => {
    // 只要请求成功，不管返回什么状态码，都走这个回调
    if (res.data.code === HTTP_STATUS.SUCCESS) {
      return res.data
    }else if (res.data.code === HTTP_STATUS.NOT_FOUND) {
      throw new Error('请求资源不存在')
    } else if (res.data.code === HTTP_STATUS.BAD_GATEWAY) {
      throw new Error('服务端出现了问题')
    } else if (res.data.code === HTTP_STATUS.FORBIDDEN) {
      Taro.setStorageSync("Authorization", "")
      pageToLogin()
      // TODO 根据自身业务修改
      throw new Error('没有权限访问')
    } else if (res.data.code === HTTP_STATUS.AUTHENTICATE) {
      Taro.setStorageSync("Authorization", "")
      pageToLogin()
      throw new Error('需要鉴权')
    }
    throw new Error(res.data.msg)
  })
}

// Taro 提供了两个内置拦截器
// logInterceptor - 用于打印请求的相关信息
// timeoutInterceptor - 在请求超时时抛出错误。
const interceptors = [customInterceptor, Taro.interceptors.logInterceptor]

export default interceptors
