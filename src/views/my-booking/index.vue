<template>
  <div class="container">
    <div class="queryDiv">
      <el-form :inline="true" :model="reservation" class="demo-form-inline">
        <el-input placeholder="请输入基站名称" v-model="reservation.stationName" style="width: 180px"></el-input>
        <el-date-picker
          v-model="reservation.day"
          type="date"
          placeholder="预约日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd">
        </el-date-picker>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">查询</el-button>
          <el-button type="primary" @click="clearThem()">清空</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="bookingDiv" v-for="item in reservationList">
      <div class="station-name">{{item.stationName}}</div>
      <div class="station-address"><b>基站地址:</b>{{item.stationAddress}}</div>
      <div class="station-address"><b>预约的时间:</b>{{item.createTime}}</div>
      <div class="cancel-booking">
        <el-button type="primary" plain>取消预约</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {dirReservation} from '@/api/reservation'

export default {
  name: "index",
  data() {
    return {
      reservation: {
        stationName: '',
        day: ''
      },
      reservationList: []

    }
  },
  created() {
    this.getAllReservationList()
  },
  methods: {
    getAllReservationList() {
      dirReservation(this.reservation).then((res) => {
        if (res.data.status === 200) {
          this.reservationList = res.data.data
          this.loading = false
        }
      }).catch((res) => {
        console.log(res.message)
      })
    },
    onSubmit() {
      this.getAllReservationList()
    },
    clearThem() {
      this.reservation.stationName = null,
        this.reservation.day = null
    },
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: auto;
  background-color: white;
  padding: 20px;

}

.queryDiv {
  width: 100%;
  height: 65px;
}

.bookingDiv {
  width: 460px;
  height: 255px;
  /*background-color: gainsboro;*/
  background-color: #eee;
  border: 1px solid #ccc;
  padding: 10px;
  position: relative;
}

.bookingDiv div {
  margin-bottom: 10px;
}

span {

}

.station-name {
  font-size: 24px;
  font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  font-weight: bold;
  color: #00b4aa;
}

.station-address {
  font-size: 20px;
}

.cancel-booking {
  position: absolute;
  right: 5px;
  bottom: 2px;
}
</style>
