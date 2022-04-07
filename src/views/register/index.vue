<template>
  <el-container class="login-container">
    <el-card class="animated flipInY">
      <div slot="header" class="el-card-header">
<!--        <div style="clear: both;"></div>-->
        <img src="../../../static/image/223.png" style="width: 50px;height: 50px" alt="">
        <h2 class="login-title">{{$t('login.title')}}</h2>
        <lang-select class="lang-select"></lang-select>
      </div>
      <el-form :rules="rules" :model="registerForm" ref="registerForm" label-width="60px">
        <el-form-item :label="$t('register.account')" prop="loginName" style="position:relative">
          <el-input type="text" v-model="registerForm.loginName"
                    @keyup.enter.native="goToPasswordInput"
                    maxlength="10"/>
          <span class="svg-container svg-container_user">
            <svg-icon icon-class="user" />
          </span>
        </el-form-item>
        <el-form-item :label="$t('register.password')" prop="password">
          <el-input ref="password" type="password"
                    v-model="registerForm.password"
                    @keyup.enter.native="goToPasswordInput"
                    maxlength="20" />
          <span class="svg-container svg-container_password">
            <svg-icon icon-class="password" />
          </span>
        </el-form-item>
        <el-form-item :label="$t('register.realName')" prop="realName" label-width="80px">
          <el-input type="text"
                    style="width: 50%"
                    v-model="registerForm.realName"
                    @keyup.enter.native="goToPasswordInput"
                    maxlength="20" />
          <div style="float: right">
            <label-wrap>性别&nbsp;&nbsp;&nbsp;&nbsp;</label-wrap>
            <el-radio v-model="registerForm.sex" label="1">男</el-radio>
            <el-radio v-model="registerForm.sex" label="2">女</el-radio>
          </div>
        </el-form-item>
        <el-form-item :label="$t('register.realName')" prop="realName" label-width="80px">
          <el-input type="text"
                    style="width: 50%"
                    v-model="registerForm.realName"
                    @keyup.enter.native="goToPasswordInput"
                    maxlength="20" />
        </el-form-item>
      </el-form>
    </el-card>
  </el-container>
</template>

<script>
import LangSelect from '@/components/lang-select'
export default {
  components: {
    LangSelect
  },
  data() {
    // loginName 验证
    const validateLoginName = (rule, value, callback) => {
      if (value.length > 10) {
        callback(new Error('输入的用户名太长,不能超过10位'))
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
      registerForm: {
        loginName: '',
        password: '',
        realName: '',
        mobile: '',
        address: '',
        userType: null,
        sex: '',
        age: '',
        id: ''
      },
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
        ],
        realName: [
          {  }
        ]
      },

    }
  },
  methods: {
    // 用户名输入框回车后切换到密码输入框
    goToPasswordInput() {
      this.$refs.password.$el.getElementsByTagName('input')[0].focus()
    },
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
.el-card
  position absolute
  top 50%
  left 50%
  margin -300px 0 0 -250px
  width 500px
  height 500px
  background #fff
  .el-card-header
    display flex
    justify-content left
    align-items center

  .login-title
    margin-left 10px
    width 70%
    text-align left
  .lang-select
    float right
    position absolute
    right 20px
    top 20px
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
</style>
