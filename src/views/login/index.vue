<template>
  <div >
    <el-main class="fulbg" style="height:760px">
        <el-card class="login-from-layout bg" shadow="hover" style="height:310px;">
          <el-form ref="loginForm"
                  :model="loginForm"
                  :rules="loginRules">
            <h2 style="color:rgb(15, 245, 46);margin-top:0px;">HIS系统</h2>
            <el-form-item>
              <el-select v-model="loginForm.type" placeholder="请选择用户登陆类别" style="width:180px;">
                <el-option
                v-for="item in items"
                  :key="item.id"
                  :label="item.type"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" placeholder="请输入用户名" style="width:200px;" ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="loginForm.password" placeholder="请输入密码" style="width:200px;" :type="pwdType" @keyup.enter.native="handlerlogin"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :loading="loading" @click.native.prevent="handlerlogin" icon="el-icon-s-help">登陆</el-button>
            </el-form-item>
          </el-form>
        </el-card>
    </el-main>
    

  </div>
</template>

<script>
    
    export default {
        name: "login",
      data(){
          return{
            loginForm:{
              username:'',
              password:'',
              type:''
            },
            loginRules:{
              username:[{required:true,trigger:'blur'}],
              password:[{required:true,trigger:'blur'}]
            },
            loading:false,
            pwdType:'password',
            items:[
              {type:'管理员',id:1},
              {type:'挂号收费员',id:2},
              {type:'医生',id:3}
            ]
          }
      },
      methods:{
        handlerlogin(){
          this.$refs.loginForm.validate(valid=>{
            if(valid){
              this.loading=true;

              this.$store.dispatch('Login',this.loginForm).then(()=>{
                this.loading=false;
                this.$router.push({path:'/admain'})
              }).catch(error=>{
                this.loading = false
              })
            }else {
              console.log('参数验证不合法！');
              return false
            }
          })
        }
      }
    }
</script>

<style scoped>
.fulbg{
  margin-top:0;
  height: 600px;
  background: url(../../assets/bg1.jpg);
  background-size: 100% 100%;
}
.bg{
  background: url(../../assets/bg.jpg) ;
}
.login-from-layout{
  width:470px;
  height: 321px;
  position: relative;
  margin: 140px auto;
  border-top: 10px solid rgb(15, 245, 46);
  border-left:0px;
  border-right: 0px;
  border-bottom: 0px;
}
</style>
