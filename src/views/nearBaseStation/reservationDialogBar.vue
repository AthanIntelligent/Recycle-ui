<template>
  <div class="reservation_div">
   <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="预约日期" prop="day">
      <!--控制日期组件只能显示包括当前日期起的三天 其他日期控制为不可选-->
      <div style="display: flex">
        <el-button type="primary" size="small" disabled>
          {{ this.getDateStr(0).toString().trim().substring(0,4)}}
        </el-button>
        <el-button size="small" plain @click="getDay(0)" v-show="!isShowBut1">
          {{ this.getDateStr(0).toString().trim().substring(5,11).replace('-','/')}}
        </el-button >
        <el-button size="small" type="success" plain @click="getDay(0)" v-show="isShowBut1">
          {{ this.getDateStr(0).toString().trim().substring(5,11).replace('-','/')}}
        </el-button >
        <el-button size="small" plain @click="getDay(1)"  v-show="!isShowBut2">
          {{ this.getDateStr(1).toString().trim().substring(5,11).replace('-','/')}}
        </el-button>
        <el-button size="small" type="success" plain @click="getDay(1)"  v-show="isShowBut2">
          {{ this.getDateStr(1).toString().trim().substring(5,11).replace('-','/')}}
        </el-button>
        <el-button size="small" plain @click="getDay(2)"  v-show="!isShowBut3">
          {{ this.getDateStr(2).toString().trim().substring(5,11).replace('-','/')}}
        </el-button>
        <el-button size="small" type="success" plain @click="getDay(2)"  v-show="isShowBut3">
          {{ this.getDateStr(2).toString().trim().substring(5,11).replace('-','/')}}
        </el-button>
      </div>
    </el-form-item>
    <el-form-item label="预约时间" prop="time">
      <el-time-select
        placeholder="预约时间点"
        v-if="isShowBut1 == false"
        v-model="$props.reservationD.time"
        :picker-options="{
            start: '09:00',
            step: '00:60',
            end: '17:00'
           }"
      >
      </el-time-select>
      <el-time-select
        placeholder="预约时间点"
        v-else-if="isShowBut1==true && isJudgeBooking==false"
        v-model="$props.reservationD.time"
        :picker-options="{
            start: currTime,
            step: '00:60',
            end: '17:00'
           }"
      >
      </el-time-select>
      <span v-if="isShowBut1==true && isJudgeBooking==true">今天不能预约了</span>
    </el-form-item>
    <el-form-item label="预约基站" prop="appointmentStation">
      <el-input type="text" style="width: 290px" v-model="$props.reservationD.appointmentStationName" disabled></el-input>
    </el-form-item>
     <el-form-item>
       <el-button type="button" plain size="small" @click="cancelBooking">取消</el-button>
       <el-button type="primary" size="small" style="margin-left: 20px" @click="toBooking">确认</el-button>
     </el-form-item>

  </el-form>
  </div>
</template>

<script>
import {addReservation} from '@/api/reservation'
export default {
  name: "reservationDialogBar",
  props: {
    reservationD: {}
  },
  data() {
    return {
      isShowBut1:false,
      isShowBut2:false,
      isShowBut3:false,
      currTime:null,
      isJudgeBooking:false
    }
  },
  methods: {
    getNowFormatDate() {
      let date = new Date();
      let seperator1 = "-";
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      let currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    getDay(val){
      this.$props.reservationD.day = this.getDateStr(val)
      if(val==0){
        this.isShowBut1 = true;
        this.isShowBut2 = false;
        this.isShowBut3 = false;
        if((new Date().getHours()+2)>17){
          this.isJudgeBooking = true;
        }else{
          this.isJudgeBooking = false;
          this.currTime = new Date().getHours()+2+":00";
        }
      }else if(val == 1){
        this.isShowBut2 = true
        this.isShowBut1 = false;
        this.isShowBut3 = false;
      }else{
        this.isShowBut3 = true
        this.isShowBut1 = false;
        this.isShowBut2 = false
      }
    },
    afterThreeDays() {
      console.log('前天：', this.getDateStr(-2));
      console.log('昨天：', this.getDateStr(-1));
      console.log('今天：', this.getDateStr(0));
      console.log('明天：', this.getDateStr(1));
      console.log('后天：', this.getDateStr(2));
      // this.threeDays = [this.getDateStr(0),this.getDateStr(1),this.getDateStr(2)]
      // console.log(this.threeDays)
    },
    getDateStr(AddDayCount) {
      var dd = new Date();
      dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
      var y = dd.getFullYear();
      var m = dd.getMonth() + 1;//获取当前月份的日期
      var d = dd.getDate();
      if (d >= 0 && d <= 9) {
        d = "0" + d;
      }
      return y + '-' + (m < 10 ? '0' + m : m) + '-' + d;
    },
    toBooking(){
      if(this.isJudgeBooking = true){
        this.accountTip('warning','提示','今天不能预约了')
        this.cancelBooking();
        return;
      }
      if(this.$props.reservationD.appointmentStationName==null || this.$props.reservationD.appointmentStationName == ''){
        this.accountTip('warning','提示','未能获取到基站，请重新打开预约')
        this.cancelBooking();
        return;
      }
      if(this.$props.reservationD.day==null || this.$props.reservationD.day == ''){
        this.accountTip('warning','提示','请选择预约日期')
        return
      }
      if(this.$props.reservationD.time==null || this.$props.reservationD.time == ''){
        this.accountTip('warning','提示','请选择预约时间')
        return;
      }

      addReservation(this.$props.reservationD).then(res => {
        if(res.data.status == 200){
          this.accountTip('success','成功','预约成功')
          this.cancelBooking();
        }else{
          this.accountTip('error','失败','服务器异常')
          this.cancelBooking();
        }

      }).catch(err=>{
        this.accountTip('error','失败',err.message)
        this.cancelBooking();
      })

    },
    cancelBooking(){
      this.$emit('cancelBooking',true)
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

  }
}
</script>

<style scoped>
  .reservation_div{
    width: 430px;
    height: auto;
    border: 1px solid #ccc;
    background-color: white;
    padding-top:20px;
    padding-right:20px ;
  }
</style>
