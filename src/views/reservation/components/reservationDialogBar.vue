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
  methods: {
    getNowFormatDate() {
      let date = new Date();
      let seperator1 = "-";
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      let strDate2 = date.getDate()+1;
      let strDate3 = date.getDate()+2;
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (strDate2 >= 0 && strDate2 <= 9) {
        strDate2 = "0" + strDate2;
      }
      if (strDate3 >= 0 && strDate3 <= 9) {
        strDate3 = "0" + strDate3;
      }
      let currentdate = year + seperator1 + month + seperator1 + strDate;
      let currentdate2 = year + seperator1 + month + seperator1 + strDate2;
      let currentdate3 = year + seperator1 + month + seperator1 + strDate3;
      let threeDays = [currentdate,currentdate2,currentdate3]
      return threeDays;
    },
    afterThreeDays() {
      let threeDays = this.getNowFormatDate();
      console.log(threeDays)

    }
  }
}
</script>

<style scoped>

</style>
