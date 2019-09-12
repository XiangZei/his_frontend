<template>
    <div>
        <el-container style="height: 762px;" class="fulbg1">
          <transition name="el-zoom-in-center" style="" >
            <div :style="hei">
              <div style="width:160px; height: 30px; padding-top: 10px; color: rgb(184, 203, 243)" class = "menu fulbg2" v-show="!doc"  >{{usertype}}</div>
              <el-aside width="160px"v-show="!doc"  class = "menu" style="opacity:0.6;" >
                <el-menu style="margin-top:0px;" default-active="1" :collapse="show" :router=true class = "menu">

                  <el-menu-item   v-show="med" v-for="(item,i) in navList" :key="i" :index="item.url" >
                    <i :class="item.icon"></i>
                      {{item.name}}
                  </el-menu-item>
                  <el-submenu index='2' v-show="doc" >
                    <template slot="title">
                      <i class="el-icon-s-flag"></i>
                      <span>医生看诊</span>
                    </template>
                    <el-menu-item v-for="(item,i) in docList" :key="i" :index="item.url">
                      {{item.name}}
                    </el-menu-item>
                  </el-submenu>
                  <el-menu-item   :index="withdrawUrl" v-show="med">
                    <i class="el-icon-orange"></i>
                      发药
                  </el-menu-item>
                </el-menu>
              </el-aside>
            </div>
          </transition>

          <el-container>
            <el-header style="text-align: right; font-size: 12px ;background-color: #0fe2ad; height: 40px;box-shadow: 0 4px 8px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0,0, .12)" class="fulbg2">
              <el-row style="margin-top: 0px;" >
                <el-col :span="8" :lg="8">
                    <div  @click="show = !show" class="grid-content" style="margin-top:14px; text-align:left;">
                      <div class="el-icon-caret-left header" style="text-align:left"></div>
                      <div class="el-icon-caret-right header" style="text-align:left"></div>
                    </div>
                </el-col>
                <el-col :span="8" :lg="8" >
                  <div  style="color: rgb(184, 203, 243); font-size:20px; text-align:center; margin-top: 6px; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">东软云就诊</div>
                </el-col>
                <el-col :span="8"  :lg="8">
                  <div  class="grid-content" style="text-align:right; position: relative;">
                    
                    <el-dropdown>
                      <span>
                          <el-avatar  icon="el-icon-user" style="background-color: rgb(184, 203, 243)">
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
            <el-main style="padding: 3px 10px;" class="fulbg " >
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
        name:"",
        show:false,
        reg:false,
        doc:false,
        med:false,
        hei:{
          height:"100px"
        },
        navList:[
          {url:'/admain/regis',name:"挂号",icon:"el-icon-burger"},
          {url:'/admain/withdraw_regis',name:"退号",icon:"el-icon-water-cup"},
          {url:'/admain/pay',name:"缴费",icon:"el-icon-goblet-square-full"},
          {url:'/admain/refund',name:"退费",icon:"el-icon-coffee"}
        ],
        withdrawUrl:'/admain/medicine',
        docList:[
          {url:'/admain/diagnose',name:"看诊"},
          {url:'/admain/prescription',name:'开药'}
        ]
      }
    },
    created(){
      this.name = localStorage.getItem("type");
      console.log(this.name);
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
.menu{
  background-color: rgb(184, 203, 243);
}
  .el-row {
    margin-top: 10px;
  }
  .el-col {
    border-radius: 4px;
  }

  .grid-content {
    border-radius: 4px;

  }
  .fulbg{
  margin-top:0;
  background: url(../assets/bg2.jpg);
  
  
}
.fulbg1{
  
  background: url(../assets/bg3.gif) no-repeat;
  background-size: auto 763px;
}
.fulbg2{
  
  background: url(../assets/bg5.jpg);
}

</style>
