<template>
  <div>
    <el-card class="login-from-layout">
      <el-form ref="loginForm"
              :model="loginForm"
              :rules="loginRules">
        <h2 class="">login</h2>
        <el-form-item>
          <el-select v-model="loginForm.type" placeholder="请选择用户登陆类别">
            <el-option
            v-for="item in items"
              :key="item.id"
              :label="item.type"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码" :type="pwdType" @keyup.enter.native="handlerlogin"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click.native.prevent="handlerlogin">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>

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
.login-from-layout{
  width:360px;
  position: relative;
  margin: 140px auto;
  border-top: 10px solid #409EFF;
}
</style>
