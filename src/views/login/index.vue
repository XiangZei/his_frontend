<template>
  <div class="login-container" >
    <el-main class="fulbg" style="height:760px">
          <el-form ref="loginForm"
                   class="login-form"
                  :model="loginForm"
                  :rules="loginRules"
                   autocomplete="on" label-position="left">
            <div class="title-container">
              <h1 id="logo" style="margin: 0;">HIS系统</h1>
            </div>
            <el-form-item prop="username">

                      <el-input
                        prefix-icon="el-icon-user"
                        ref="username"
                        v-model="loginForm.username"
                        placeholder="用户名"
                        name="username"
                        type="text"
                        tabindex="1"
                        autocomplete="on"
                      />
              </el-form-item>
            <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
                <el-form-item prop="password">

                        <el-input
                          prefix-icon="el-icon-lock"
                          :key="pwdType"
                          ref="password"
                          v-model="loginForm.password"
                          :type="pwdType"
                          placeholder="密码"
                          name="password"
                          tabindex="2"
                          autocomplete="on"
                          @keyup.native="checkCapslock"
                          @blur="capsTooltip = false"
                          @keyup.enter.native="handlerlogin"
                        >
                          <i
                            class="el-icon-edit el-input__icon"
                            slot="suffix"
                            @click="showPwd">
                          </i>
                        </el-input>


                </el-form-item>
              </el-tooltip>
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <el-select  v-model="loginForm.type" placeholder="请选择用户登陆类别" style="width:180px;">
                    <el-option
                      v-for="item in items"
                      :key="item.id"
                      :label="item.type"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <el-button type="primary" :loading="loading" @click.native.prevent="handlerlogin" icon="el-icon-s-help">登陆</el-button>

                </el-form-item>
              </el-col>
            </el-row>
            <div style="position:relative">
              <div class="tips">
                <span>医生用户名 : hqb</span>
                <span>医生密码 : hqb123</span>
              </div>
              <div class="tips">
                <span style="margin-right:18px;">挂号员用户名 : ghy</span>
                <span>挂号员密码 : ghy123</span>
              </div>
            </div>


          </el-form>
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
            ],
            capsTooltip: false
          }
      },
      methods:{
        showPwd() {
          if (this.pwdType === 'password') {
            this.pwdType = ''
          } else {
            this.pwdType = 'password'
          }
          this.$nextTick(() => {
            this.$refs.password.focus()
          })
        },
        checkCapslock({ shiftKey, key } = {}) {
          if (key && key.length === 1) {
            if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
              this.capsTooltip = true
            } else {
              this.capsTooltip = false
            }
          }
          if (key === 'CapsLock' && this.capsTooltip === true) {
            this.capsTooltip = false
          }
        },
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

<style lang="scss" scoped >
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;
.font{
  font-family:Arial, Helvetica, sans-serif;
  font-size:45px;
  color: #c80be6;
  line-height:35px;
  text-transform:uppercase
}
  #logo {
    font-weight: 600;
    font-size: 80px;
    font-family: "黑体";
    font-style: italic;
    color: #e636c1;
    background: -webkit-linear-gradient(45deg, #3556fe, #60fb28, #fdefac, #ca1bdd, #bed5f5);
    color: transparent;
    /*设置字体颜色透明*/
    -webkit-background-clip: text;
    /*背景裁剪为文本形式*/
    animation: ran 10s linear infinite;
    /*动态10s展示*/
  }

  .fulbg{
  margin-top:0;
  height: 600px;
  background: url(../../assets/bg1.png);
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

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

.login-form {
  position: relative;
  width: 520px;
  max-width: 100%;
  padding: 100px 35px 0;
  margin: 0 auto;
  overflow: hidden;
}

.tips {
  font-size: 14px;
  color: #fff;
  margin-bottom: 10px;

span {
&:first-of-type {
   margin-right: 16px;
 }
}
}

.svg-container {
  padding: 6px 5px 6px 15px;
  color: $dark_gray;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}

.title-container {
  position: relative;

.title {
  font-size: 26px;
  color: $light_gray;
  margin: 0px auto 40px auto;
  text-align: center;
  font-weight: bold;
}
}

.show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  user-select: none;
}

.thirdparty-button {
  position: absolute;
  right: 0;
  bottom: 6px;
}

@media only screen and (max-width: 470px) {
  .thirdparty-button {
    display: none;
  }
}
}
</style>
