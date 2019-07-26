import request from '@/utils/request'


export function login(type,username,password){
  return request({
    url:'/admin/login',
    method:'post',
    data:{
      username,
      password,
      type
    }
  })
}

export function getInfo(username){
  return request({
    url:'/admin/getInfo?username='+username,
    method:'get'
  })
}

export function logout(){
  return request({
    url:'/admin/logout',
    method:'get'
  })
}
