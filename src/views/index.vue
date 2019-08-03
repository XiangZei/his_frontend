<template>
    <div>
        <el-container style="height: 745px;">
          <transition name="el-zoom-in-center" >
            <div :style="hei">
              <div style="border-radius: 15px;background-color: rgb(238, 241, 246);width:200px; height: 30px; padding-top: 10px;" v-show="!doc"  >{{usertype}}</div>
              <el-aside width="200px"v-show="!doc">
                <el-menu style="margin-top:30px;" default-active="1" :collapse="show" :router=true >
                  <el-submenu index="1" v-show="reg" >
                    <template slot="title">
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
            <el-header style="text-align: right; font-size: 12px ;background-color: #0fe2ad;border-radius: 15px; height: 40px;">
              <el-row style="margin-top: 0px;">
                <el-col :span="8" :lg="8">
                    <div  @click="show = !show" class="grid-content" style="margin-top:14px; text-align:left;">
                      <div class="el-icon-caret-left header" style="text-align:left"></div>
                      <div class="el-icon-caret-right header" style="text-align:left"></div>
                    </div>
                </el-col>
                <el-col :span="8" :lg="8" >
                  <div  style="font-size:20px; text-align:center; margin-top: 6px;">东软云就诊</div>
                </el-col>
                <el-col :span="8"  :lg="8">
                  <div  class="grid-content" style="text-align:right; position: relative;">
                    <el-dropdown>
                          <span class="el-dropdown-link">
                            <el-avatar  icon="el-icon-s-custom">
                            </el-avatar>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                              <div v-on:click="logout">退出</div>
                            </el-dropdown-item>
                          </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                </el-col>
              </el-row>

            </el-header>
            <el-main style="padding: 3px 10px;">
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
        hei:{
          height:"100px"
        },
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
        if(this.usertype=='医生'){
          this.$router.push({path:'/admain/diagnose'})
          this.hei="100px"
        }else{
          this.hei=""
        }
        this.med=(this.usertype=='挂号收费员')
    }
}
</script>

<style scoped>
  .el-row {
    margin-top: 10px;
  }
  .el-col {
    border-radius: 4px;
  }

  .grid-content {
    border-radius: 4px;

  }


</style>
