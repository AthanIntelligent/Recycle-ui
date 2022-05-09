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
          <div v-show="verAccountFlag" style="color:red;font-size: 12px;position: absolute;top: 29px;">{{verAccount}}</div>
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
        <el-form-item :label="$t('register.address')" prop="address" label-width="80px">
          <el-cascader
            style="width: 50%"
            :options="options"
            v-model="selectedOptions"
            @change="handleChange">
          </el-cascader>
          <div style="float: right">
            <label-wrap>年龄&nbsp;&nbsp;&nbsp;&nbsp;</label-wrap>
            <el-input-number size="small" v-model="registerForm.age" controls-position="right" @change="handleAgeChange" :min="18" :max="60" label="年龄"></el-input-number>
          </div>
        </el-form-item>
        <el-form-item :label="$t('register.address2')" prop="address2" label-width="80px">
          <el-input type="text"
                    style="width: 100%"
                    v-model="address2"
                    @keyup.enter.native="goToPasswordInput"
                    maxlength="50" />
        </el-form-item>
        <el-form-item :label="$t('register.id')" prop="id" label-width="80px">
          <el-input
                    onkeyup="this.value=this.value.replace(/[^\X0-9]/g, '')"
                    style="width: 76%"
                    v-model="registerForm.id"
                    maxlength="18" />

        </el-form-item>
        <el-form-item :label="$t('register.mobile')" prop="mobile" label-width="80px">
          <el-input type="number"
                    style="width: 76%"
                    v-model="registerForm.mobile"
                    @keyup.enter.native="goToPasswordInput"
                    maxlength="11" />

        </el-form-item>
        <el-form-item label-width="0px">
          <div style="display: flex;justify-content: space-around">
            <el-radio v-model="registerForm.userType" label='1'>普通用户</el-radio>
            <el-radio v-model="registerForm.userType" label='2'>基站人员</el-radio>
            <el-radio v-model="registerForm.userType" label='3'>系统管理员</el-radio>
          </div>

        </el-form-item>
      </el-form>
      <div style="display: flex;justify-content: space-around;">
        <el-button type="button" style="width: 45%;color: gray;" @click="reset">取消重置</el-button>
        <el-button type="button" style="width: 45%;background-color: #1d7ac2;color: white;" @click="register">确认提交</el-button>
      </div>
    </el-card>
  </el-container>
</template>

<script>
import LangSelect from '@/components/lang-select'
import {regionData,CodeToText} from 'element-china-area-data'
import {register} from "@/api/login";
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
      //mobile 验证
    const validateMobile = (rule,value,callback) => {
      if(value!='' && !/^1[3456789]\d{9}$/.test(value)){
        callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
    }
    //身份证号码验证
    let validateID = (rule,value,callback) => {
      if (!value) {
        return callback(new Error("身份证号不能为空"));
      }
      if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
        callback(new Error("你输入的身份证长度或格式错误"));
      }
      //身份证城市
      var aCity = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
      };
      if (!aCity[parseInt(value.substr(0, 2))]) {
        callback(new Error("你的身份证地区非法"));
      }
      // 出生日期验证
      var sBirthday = (
          value.substr(6, 4) +
          "-" +
          Number(value.substr(10, 2)) +
          "-" +
          Number(value.substr(12, 2))
        ).replace(/-/g, "/"),
        d = new Date(sBirthday);
      if (
        sBirthday !=
        d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate()
      ) {
        callback(new Error("身份证上的出生日期非法"));
      }

      // 身份证号码校验
      var sum = 0,
        weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
        codes = "10X98765432";
      for (var i = 0; i < value.length - 1; i++) {
        sum += value[i] * weights[i];
      }
      var last = codes[sum % 11]; //计算出来的最后一位身份证号码
      if (value[value.length - 1] != last) {
        callback(new Error("你输入的身份证号非法"));
      }
      callback();
    }
    return {
      registerForm: {
        loginName: '',
        password: '',
        realName: '',
        mobile: '',
        address: '',
        userType: '1',
        sex: '1',
        age: '',
        id: ''
      },
      address1: '',
      address2: '',
      verifyCode: '',
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
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validateMobile },
          { required: true, trigger: 'change', validator: validateMobile }
        ],
        id: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validateID },
          { required: true, trigger: 'change', validator: validateID }
        ]
      },
      options: regionData,
      selectedOptions: [],
      verAccount: '账户不能为空',
      verAccountFlag: false
    }
  },
  methods: {
    // 用户名输入框回车后切换到密码输入框
    goToPasswordInput() {
      this.$refs.password.$el.getElementsByTagName('input')[0].focus()
    },
    handleChange() {
      var loc = "";
      for(let i=0;i<this.selectedOptions.length;i++){
        loc += CodeToText[this.selectedOptions[i]];
      }
      this.address1 = loc;
    },
    //改变年龄
    handleAgeChange(val) {
      this.registerForm.age = val
    },
    //重置
    reset() {
      this.registerForm.loginName = '',
      this.registerForm.password = '',
      this.registerForm.realName = '',
      this.registerForm.mobile = '',
      this.registerForm.address = '',
      this.registerForm.userType = null,
      this.registerForm.sex = '1',
      this.registerForm.age = '',
      this.registerForm.id = ''
      this.address2 = '',
      this.verifyCode = ''
    },
    //注册
    register() {
      if(this.address1.length > 0 || this.address2.length > 0){
        this.registerForm.address = this.address1 + "," + this.address2;
      }else {
        this.registerForm.address = ''
      }
      register(this.registerForm).then(res => {
        console.log(res)
        if(res.data.status == 200){
          this.accountTip('成功','success','注册成功')
          this.$router.push({path:'/login'})
        }else if(res.data.status == 400){
          this.accountTip('错误','error',res.data.message)
        }
      }).cache(err => {
        console.log(err)
        this.accountTip('失败','error','服务器报错')
      })
    },
    accountTip(title,type,info) {
      this.$notify({
        title: title,
        dangerouslyUseHTMLString: true,
        message: '<strong>提示：<i>'+info+'</i></strong>',
        type: type,
        position: 'top-right',
        offset: 80
      })
    }
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
  width 590px
  height 630px
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
