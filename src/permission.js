import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import {getToken} from "@/utils/auth";
import {Message} from 'element-ui'
import router from './router'
import store from './store'
//路由拦截
router.beforeEach((to,from,next)=>{
  Nprogress.start();
  if(getToken()){
    if(to.path==='/'){
      next()
      Nprogress.done()
    }else{
      if(store.getters.msg.length===0){
        store.dispatch('GetInfo').then(res=>{ //拉取用户信息
          next()
        }).catch((err)=>{
          store.dispatch('FedLogOut').then(()=>{
            Message.error(err||"Vertification failed,please login again")
            next({path:'/'})
          })
        })
      }else{
        next()
      }
      next()
      Nprogress.done();
    }
  }else{
    if(to.path!=='/'){
      next({path: '/'})
    }else{
      next()
    }
    Nprogress.done();
  }
})
