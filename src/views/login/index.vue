<template>
  <el-container class="login-container">
    <el-switch v-model="toggleParticles"
      inactive-color="#ff4949">
    </el-switch>
<!--    <el-button class="show-account" type="text" @click="accountTip">提示帐号信息</el-button>-->
    <el-card class="animated flipInY">
      <div slot="header" class="el-card-header">
        <lang-select class="lang-select"></lang-select>
        <div style="clear: both;"></div>
        <img src="../../../static/image/223.png" alt="">
        <h2 class="login-title">{{$t('login.title')}}</h2>
      </div>
      <el-form :rules="rules" :model="loginForm" ref="loginForm" label-width="80px">
        <el-form-item :label="$t('login.account')" prop="loginName" style="position:relative">
          <el-input type="text" v-model="loginForm.loginName"
            @keyup.enter.native="goToPasswordInput"
            maxlength="20"/>
          <span class="svg-container svg-container_user">
            <svg-icon icon-class="user" />
          </span>
        </el-form-item>
        <el-form-item :label="$t('login.password')" prop="password">
          <el-input ref="password" type="password"
            v-model="loginForm.password"
            @keyup.enter.native="onLogin"
            maxlength="20" />
          <span class="svg-container svg-container_password">
            <svg-icon icon-class="password" />
          </span>
        </el-form-item>
        <el-form-item :label="$t('login.remember')" label-width="80px">
          <el-switch v-model="remember"></el-switch>
        </el-form-item>
        <el-button type="primary" @click="onLogin('loginForm')" :loading="loading">{{$t('login.login')}}</el-button>
        <div style="width: 100%;height: 40px;display: flex;justify-content: center;align-items: center">还没有账号吗？去<a href="/#/register" style="color: #1b427b">注册</a></div>
      </el-form>
    </el-card>
    <!-- particles.js container -->
    <div id="particles"></div>
  </el-container>
</template>
<script>
import { isValidLoginName } from '@/utils/validate'
import {getStationStatus} from '@/api/station'
import LangSelect from '@/components/lang-select'
import { saveToLocal, loadFromLocal } from '@/common/local-storage'
import { mapActions } from 'vuex'
/* eslint-disable*/
import particles from 'particles.js'

export default {
  components: {
    LangSelect
  },
  data() {
    // loginName 验证
    const validateLoginName = (rule, value, callback) => {
      if (!isValidLoginName(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    // password 验证
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      // 粒子开关
      toggleParticles: false,
      loginForm: {
        loginName: '',
        password: ''
      },
      remember: false,
      loading: false,
      rules: {
        loginName: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validateLoginName },
          { required: true, trigger: 'change', validator: validateLoginName }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validatePassword },
          { required: true, trigger: 'change', validator: validatePassword }
        ]
      }
    }
  },
  created() {
    // 初始化时读取localStorage用户信息
    if (loadFromLocal('remember', false)) {
      this.loginForm.loginName = loadFromLocal('loginName', '')
      this.loginForm.password = loadFromLocal('password', '')
    } else {
      this.loginForm.loginName = ''
      this.loginForm.password = ''
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    // 用户名输入框回车后切换到密码输入框
    goToPasswordInput() {
      this.$refs.password.$el.getElementsByTagName('input')[0].focus()
    },
    // 登录操作
    onLogin() {
      this.$refs.password.$el.getElementsByTagName('input')[0].blur()
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.login(this.loginForm).then((res) => {
            if(res.data.data.openFlag == 2){
              this.accountTip("error",'账户错误',"账户已被加入黑名单,请联系管理员");
              this.loading = false
              return
            }
            // 保存账号
            if(res.data.status === 200){
              if (this.remember) {
                saveToLocal('loginName', this.loginForm.loginName)
                saveToLocal('password', this.loginForm.password)
                saveToLocal('remember', true)
              } else {
                saveToLocal('loginName', '')
                saveToLocal('password', '')
                saveToLocal('remember', false)
              }
              localStorage.setItem('realName',res.data.data.realName)
              if(res.data.data.userType == 2){
                getStationStatus(res.data.data.uuid).then(sta => {
                  if(sta.data.data == null){
                    this.$router.push({path: '/joinStation'})
                  }
                  if(sta.data.data != null && sta.data.data.check != '审核成功' || sta.data.data.openFlag == '2'){
                    this.$router.push({path: '/joinStation'})
                  }else {
                    this.$router.push('/home')

                  }
                }).cache(err => {
                  this.loading = false
                })
              }else if(res.data.data.userType == 3){
                this.$router.push('/echarts')

              }else{
                this.$router.push({path: '/nearBaseStation'})
              }
            }else {
              this.accountTip("error","输入错误",res.data.message);
              this.loading = false
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    accountTip(type,title,info) {
      this.$notify({
        title: title,
        dangerouslyUseHTMLString: true,
        message: '<strong>提示：<i>'+info+'</i></strong>',
        type: type,
        position: 'top-right',
        offset: 80
      })
    }
  },
  watch: {
    toggleParticles(val) {
      if(val) {
        particlesJS('particles', {
          "particles": {
            "number": {
              "value": 15
            },
            "color": {
              "value": "random"
            },
            "shape": {
              "type": ["star", "image"],
              "stroke": {
                "width": 0,
                "color": "yellow"
              },
              "polygon": {
                "nb_sides": 5
              },
              "image": {
                "src": "https://neveryu.github.io/avatar/avatar.png",
                "width": 100,
                "height": 100
              }
            },
            "opacity": {
              "value": 1,
              "random": false,
              "anim": {
                "enable": true,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
              }
            },
            "size": {
              "value": 10,
              "random": true,
              "anim": {
                "enable": true,
                "speed": 10,
                "size_min": 0.1,
                "sync": false
              }
            },
            "line_linked": {
              "enable": false,
              "distance": 150,
              "color": "#ccc",
              "opacity": 0.4,
              "width": 1
            },
            "move": {
              "enable": true,
              "speed": 2,
              "direction": "random",
              "random": true,
              "straight": false,
              "out_mode": "out",
              "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
              }
            }
          },
          "interactivity": {
            // "detect_on": "canvas",
            "detect_on": "window",
            "events": {
              "onhover": {
                "enable": false,
                // "mode": "repulse"
                "mode": "grab"
              },
              "onclick": {
                "enable": false,
                "mode": "repulse"
                // "mode": "push"
              },
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 400,
                "line_linked": {
                  "opacity": 1
                }
              },
              "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
              },
              "repulse": {
                "distance": 200
              },
              "push": {
                "particles_nb": 4
              },
              "remove": {
                "particles_nb": 2
              }
            }
          }
        })
      } else {
        document.getElementById('particles').innerHTML = ''
      }
    }
  },
  mounted() {
  }
}
</script>
<style scoped lang="stylus">
.login-container
  position absolute
  width 100%
  height 100%
  top 0
  left 0
  right 0
  bottom 0
  background mix(#044289, #494166) url('../../../static/image/login-bg.svg') center no-repeat
  background-size cover
  overflow hidden
  .show-account
    position absolute
    left 15px
    bottom 20px
    color var(--red)
    font-weight 500
  .el-card
    position absolute
    top 50%
    left 50%
    margin -300px 0 0 -250px
    width 500px
    height 500px
    background #fff
    .el-card-header
      text-align center
      .lang-select
        float right
    .login-title
      margin 0
      text-align center
    .el-input /deep/ .el-input__inner
      text-indent 12px
    .svg-container
      position absolute
      top 0
      left 5px
      color var(--gray)
      &_user
        font-size 20px
      &_password
        left 7px
        font-size 16px
    .el-button--primary
      width 100%
#particles
  width 100%
  height 100%
  /*background-color #b61924*/
  /*background-color #23ae88*/
  background-color transparent
  // background-image url('/static/image/login-bg.jpg')
  /*background-image url('../img/bg_particles.png')*/
  background-size cover
  background-position 50% 50%
  background-repeat no-repeat
</style>
