import {login,logout,getInfo} from '@/api/login'
import {getToken,setToken,removeToken} from "@/utils/auth";

const user={
  state:{
    token:getToken(),
    name:localStorage.getItem("name"),
    avatar:'',
    type:localStorage.getItem("type"),
    msg:[],
    id:10
  },
  mutations:{
    SET_TOKEN:(state, token)=>{
      state.token=token
    },
    SET_NAME:(state,name)=> {
      localStorage.setItem("name",name)
      state.name = name
    },
    SET_AVATAR:(state,avatar)=>{
      state.avatar = avatar
    },
    SET_TYPE:(state,type)=>{
      localStorage.setItem("type",type)
      state.type=type
    },
    SET_MSG:(state,msg)=>{
      state.msg=msg
    }
  },
  actions:{
    Login({commit},userInfo){
      const username = userInfo.username.trim()
      return new Promise((resolve,reject)=>{
        commit('SET_NAME',username)
        if(userInfo.type==1){
          commit('SET_TYPE',"管理员")
        }else if(userInfo.type==2){
          commit("SET_TYPE","挂号收费员")
        }else if(userInfo.type==3){
          commit("SET_TYPE","医生")
        }
        login(userInfo.type,username,userInfo.password).then(
          response=>{
            const data = response.data;
            const tokenStr = data.tokenHead+data.token
            setToken(tokenStr)
            commit('SET_TOKEN',tokenStr)

            resolve()
          }).catch(error=>{
            reject(error)
        })
      })
    },
    //获取用户信息
    GetInfo({commit,state}){
      return new Promise((resolve,reject)=>{
        getInfo(state.name).then(response=>{
          const data = response.data
          if(data.msg&&data.msg.length>0){
            commit('SET_MSG',data.msg)
          }
          commit('SET_AVATAR',data.avatar)
          resolve(response)
        }).catch(error=>{
          reject(error)
        })
      })
    },
    //登出
    LogOut({commit,state}){
      return new Promise((resolve,reject)=>{
        logout().then(()=>{
          commit('SET_TOKEN','')
          commit('SET_NAME','')
          commit('SET_AVATAR','')
          commit('SET_TYPE','')
          commit('SET_MSG',[])
          removeToken()
          resolve()
        }).catch(error=>{
          reject(error)
        })
      })
    },
    //前端 登出
    FedLogOut({commit}){
      return new Promise(resolve=>{
        commit('SET_TOKEN','')
        removeToken()
        resolve()
      })
    }
  }
};
export default user
