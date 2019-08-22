import axios from 'axios'
import {Message,MessageBox} from 'element-ui'
import store from '../store'
import {getToken} from '@/utils/auth'

//创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API,//api的base_url
  timeout:4000//请求超时时间
});


//request拦截器
service.interceptors.request.use(config=>{
    if(store.getters.token){
      config.headers['Authorization']=getToken() // 让每个请求携带自定义token
    }
    return config
  },error=>{
    alert("请求出错误")
    console.log(error)
    Promise.reject(error)
  }
)

//response拦截器
service.interceptors.response.use(
  response=>{
    /*
    状态码非200抛错
     */
    const res = response.data

    if(res.code!==200){
      Message({
        message:res.message,
        type:'error',
        duration:1000
      })
      // 401:未登录
      if(res.code===401||res.code===403){
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登陆','确定登出',{
          confirmButtonText:'重新登陆',
          cancelButtonText:'取消',
          type:'warning'
        }).then(()=>{
          store.dispatch('FedLogOut').then(()=>{
            location.reload() //为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    }else{
      return response.data
    }
  },
  error=>{
    console.log('err'+error)//for debug
    Message({
      message:error.message,
      type:'error',
      duration:1000
    })
    return Promise.reject(error)
  }
)

export default service
