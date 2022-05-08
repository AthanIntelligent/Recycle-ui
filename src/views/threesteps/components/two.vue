<template>
  <div >
    <div class="app-container">
      <el-form :rules="rules" :model="TelPhoneForm" ref="TelPhoneForm" label-width="60px" >
        <el-form-item :label="$t('register.mobile')" prop="mobile" label-width="80px">
          <el-input type="number"
                    style="width: 70%"
                    v-model="TelPhoneForm.mobile"
                    maxlength="11" />

        </el-form-item>
        <el-form-item :label="$t('register.verifyCode')" label-width="80px">
          <el-input type="text"
                    style="width: 34%"
                    v-model="verifyCode"
                    maxlength="6" />
          <el-button style="background-color: white;color: gray;width: 100px;height:36px;font-size: 12px" v-show="showTime" @click="getVerifyCode">获取验证码</el-button>
          <el-button style="background-color: white;color: gray;width: 100px;height:36px;font-size: 12px" v-show="!showTime">{{sendTime}}秒</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div style="width: 100%;display:flex;justify-content: center;margin-top: 20px">
      <el-button type="primary" @click="judgeVerifyCode()"  plain>下一步</el-button>
    </div>
  </div>
</template>

<script>
  import {sendMessage,verifyPhoneCode} from "@/api/userA";

  export default {
  name: "two",
  data(){
    const validateMobile = (rule,value,callback) => {
      if(!/^1[3456789]\d{9}$/.test(value)){
        callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
    }
    return{
      TelPhoneForm: {
        mobile: '',
      },
      verifyCode:'',
      showTime: true,
      /* 布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
      sendTime: '',
      /* 倒计时 计数器 */
      timer: null,
      rules:{
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validateMobile },
          { required: true, trigger: 'change', validator: validateMobile }
        ]
      }
    }
  },
  methods:{
    getVerifyCode() {
      var _that = this;
      if(_that.TelPhoneForm.mobile === "") {
        alert("请输入你的手机号");
        return
      }
      var regBox = {
        regEmail: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, //....邮箱
        regPhone:/^1[3|4|5|7|8][0-9]{9}$/ //验证规则
      }
      var phoneflag = regBox.regPhone.test(_that.TelPhoneForm.mobile);
      if(!phoneflag) {
        alert("输入的手机号有误！");
        return;
      }
      sendMessage(_that.TelPhoneForm.mobile).then(res => {
        if(res.data == "success") {
          this.accountTip('success', null, '发送成功')
        }else{
          this.accountTip('error', '错误', '发送失败')
        }
      }).catch(err => {

      })
      const TIME_COUNT = 60; //  更改倒计时时间
      if(!this.timer) {
        this.sendTime = TIME_COUNT;
        this.showTime = false;
        this.timer = setInterval(() => {
          if(this.sendTime > 0 && this.sendTime <= TIME_COUNT) {
            this.sendTime--;

          } else {
            this.showTime = true;
            clearInterval(this.timer); // 清除定时器
            this.timer = null;
          }
        }, 1000);
      }
    },
    judgeVerifyCode(){
      this.$emit('flagTwo',true)
      return;
      if(this.verifyCode == null || this.verifyCode.toString().trim() === ""){
        this.accountTip('warning','提示','请输入验证码')
        return;
      }
      verifyPhoneCode(this.verifyCode).then(res => {
        if(res.data == 'success'){

        }else{
          this.accountTip('warning', '提示', '验证码错误')
        }

      }).catch(err => {

      })
    },
    accountTip(type,title,info) {
      this.$notify({
        title: title,
        dangerouslyUseHTMLString: true,
        message: '<strong>提示：<i>'+info+'</i></strong>',
        type: type,
        position: 'top-right',
        offset: 150
      })
    },
  }
}
</script>

<style scoped>
.app-container{
  width: 100%;
  height: auto;
  padding:20px;
  display: flex;
  justify-content: center;
  margin-top: 100px;
}
</style>
