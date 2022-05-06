<template>
  <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm" v-if="reservationD.uuid==''">
    <el-form-item label="预约日期" prop="day">
      <!--控制日期组件只能显示包括当前日期起的三天 其他日期控制为不可选-->
      <el-date-picker
        v-model="reservationD.day"
        type="date"
        placeholder="预约日期"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd"
        @focus="afterThreeDays">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="预约时间" prop="time">
      <el-time-select
        placeholder="预约时间点"
        v-model="reservationD.time"
        :picker-options="{
            start: '09:00',
            step: '00:60',
            end: '17:00'
           }"
      >
      </el-time-select>
    </el-form-item>
    <el-form-item label="预约基站" prop="appointmentStation">
      <el-input type="text" v-model="reservationD.appointmentStation" disabled></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "reservationDialogBar",
  props: {
    reservationD: {
      day: null,
      time: null,
      appointmentStation: null
    }
  },
  data() {
    return {
      threeDays: []
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
    afterThreeDays() {
      // console.log('前天：', this.getDateStr(-2));
      // console.log('昨天：', this.getDateStr(-1));
      // console.log('今天：', this.getDateStr(0));
      // console.log('明天：', this.getDateStr(1));
      // console.log('后天：', this.getDateStr(2));
      this.threeDays = [this.getDateStr(0),this.getDateStr(1),this.getDateStr(2)]
      console.log(this.threeDays)
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
    }

  }
}
</script>

<style scoped>

</style>
