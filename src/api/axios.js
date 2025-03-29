import axios from 'axios'
import router from '@/router'
// import Vue from 'vue'
// import qs from 'qs'
import _ from 'lodash'
import { showNotify } from 'vant'

const host = ''

const intercept = 1 // 是否拦截

export default function $axios(options, showLoading = false) {
  return new Promise((resolve, reject)=>{
    const instance = axios.create({
      baseURL: host,
      isEditContentType: true,
      timeout: 60000,
      isUpload: false
    })

    if (intercept) {
      // request 拦截器
      instance.interceptors.request.use(
        (config)=>{
          if (config.url !== '/connect/token' && config.isEditContentType) {
            config.headers['Content-Type'] = 'application/json;charset=UTF-8'
          } else if (config.url === '/connect/token') {
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
          } else if (config.isUpload) {
            // 如果是文件上传，设置600秒超时
            config.timeout = 600 * 1000
          }
          const token = localStorage.getItem('access_token')
          // 带上token
          if (token && !config.isUpload) {
            config.headers.Authorization = token
          }
          // 根据请求方法，序列化传来的参数，根据后端需求是否序列化
          if (config.method === 'get') {
            // get请求增加时间戳
            const url = config.url
            url.indexOf('?') === -1
              ? (config.url = url + '?_=' + new Date().getTime())
              : (config.url = url + '&_=' + new Date().getTime())
            // 如果是get请求，且params是数组类型如arr=[1,2]，则转换成arr=1&arr=2
            config.paramsSerializer = function(params) {
              // return qs.stringify(params, {arrayFormat: 'repeat'})
            }
          }

          return config
        },
        (error)=>{
          // 请求错误时
          // 需要重定向到错误页面
          const errorInfo = error.response
          if (errorInfo) {
            error = errorInfo.data // 页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
            const errorStatus = errorInfo.status // 404 403 500 ...
            router.push({
              path: `/error/${errorStatus}`
            })
          }
          return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
        }
      )
      // response 拦截器
      instance.interceptors.response.use(
        (response)=>{
          const { success, msg } = response.data
          if (success) {
            return response.data
          } else {
            throw msg
          }
        },
        (err)=>{
          if (err && err.response) {
            switch (err.response.status) {
              case 400:
                err.message = '请求错误'
                break
              case 401:
                err.message = '未授权，请登录'
                sessionStorage.clear()
                localStorage.removeItem('user_info')
                localStorage.removeItem('access_token')
                // 清除store中的所有模块的选井
                setTimeout(()=>{
                  router.push({ name: 'login' })
                }, 200)
                break
              case 403:
                err.message = '拒绝访问'
                break
              case 404:
                err.message = `请求地址出错: ${err.response.config.url}`
                break
              case 408:
                err.message = '请求超时'
                break
              case 500:
                err.message = '服务器内部错误'
                break
              case 501:
                err.message = '服务未实现'
                break
              case 502:
                err.message = '网关错误'
                break
              case 503:
                err.message = '服务不可用'
                break
              case 504:
                err.message = '网关超时'
                break
              case 505:
                err.message = 'HTTP版本不受支持'
                break
              case 511:
                err.message = '系统未授权，请联系管理员获取授权文件'
                break
              case 999:
                err.message = '请勿上传非法文件'
                break
              default:
                return err.message
            }
          }

          Promise.reject(err) // 返回接口返回的错误信息

          throw err
        }
      )
    }
    // 请求处理
    instance(options)
      .then((res)=>{
        resolve(res)
        return false
      })
      .catch((error)=>{
        reject(error)
        if (error?.response) {
          if (error.response.status !== 500) {
            showNotify({
              type: 'danger',
              color: '#fff',
              background: '#ff4242',
              message: error.message
            })
          }
        } else {
          console.log(error)
          showNotify({
            type: 'danger',
            color: '#fff',
            background: '#ff4242',
            message: error
          })
        }
      })
  })
}
