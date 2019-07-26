<template>
    <div>
        <el-container style="height: 745px;">
          <transition name="el-zoom-in-center" >
            <div  >
              <el-aside width="200px">
                <el-card style="border-radius: 30px;background-color: rgb(238, 241, 246)">{{usertype}}</el-card>
                
                <el-menu style="margin-top:30px;" default-active="1" :collapse="show" :router=true >
                  <el-submenu index="1" v-show="reg" >
                    <template slot="title" >
                      <i class="el-icon-location"></i>
                      <span>挂号收费</span>
                    </template>
                      <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.url" >
                        {{item.name}}
                      </el-menu-item>
                  </el-submenu>
                  <el-submenu index='2' v-show="doc">
                    <template slot="title">
                      <i class="el-icon-s-flag"></i>
                      <span>医生看诊</span>
                    </template>
                    <el-menu-item v-for="(item,i) in docList" :key="i" :index="item.url">
                      {{item.name}}
                    </el-menu-item>
                  </el-submenu>
                  <el-menu-item :index="withdrawUrl" v-show="med">
                      发药
                  </el-menu-item>
                </el-menu>
              </el-aside>
            </div>
          </transition>

          <el-container>
            <el-header style="text-align: right; font-size: 12px ;background-color: rgb(180, 223, 234);border-radius: 30px;">
              <div class="header" >
                <div  @click="show = !show" style="margin-top:7px">
                <div class="el-icon-caret-left header" style="text-align:left"></div>
                <div class="el-icon-caret-right header" style="text-align:left"></div>
              </div>
              <div style="width:520px"></div>
              <div  style="font-size:26px;margin-top:3px; ">东软云就诊</div>
              <div style="width:520px"></div>
              <el-dropdown>
                <span class="el-dropdown-link">
                  <el-avatar  icon="el-icon-user-solid">
                  </el-avatar>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <div v-on:click="logout">退出</div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              </div>
              
            </el-header>
            <el-main>
              <router-view/>
            </el-main>
          </el-container>
        </el-container>
    </div>
</template>

<script>
import {Message} from 'element-ui'
import {removeToken} from '@/utils/auth'
export default {
    name: "main",
    data(){
      return{
        usertype:"",
        show:false,
        reg:false,
        doc:false,
        med:false,
        navList:[
          {url:'/admain/regis',name:"挂号"},
          {url:'/admain/withdraw_regis',name:"退号"},
          {url:'/admain/pay',name:"缴费"},
          {url:'/admain/refund',name:"退费"}
        ],
        withdrawUrl:'/admain/medicine',
        docList:[
          {url:'/admain/diagnose',name:"看诊"},
          {url:'/admain/prescription',name:'开药'}
        ]
      }
    },
    methods:{
      logout(){
        this.$store.dispatch('LogOut').then(()=>{
            this.$router.push({path:'/'});
          }).catch((error)=>{
              console.log("退出登录失败")
        })
      }
    },
    mounted:function(){
        this.usertype = this.$store.getters.type
        this.reg=(this.usertype=='挂号收费员')
        this.doc=(this.usertype=='医生')
        this.med=(this.usertype=='挂号收费员')
    }
}
</script>

<style scoped>
.header{
  width: auto;
  margin-top: 8px;
  display: inline-flex
}
</style>
