<template>
  <div class="app-container">
    <el-form :inline="true" :model="reservation" class="demo-form-inline">
      <el-form-item label="预约日期">
        <el-date-picker
          v-model="reservation.day"
          type="date"
          placeholder="预约日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="预约时间点">
        <el-time-select
          placeholder="预约时间点"
          v-model="reservation.time"
          :picker-options="{
            start: '09:00',
            step: '00:60',
            end: '17:00'
           }"
          >
        </el-time-select>
      </el-form-item>
      <el-form-item label="到访状态">
        <el-select v-model="reservation.isCome" placeholder="到访状态">
          <el-option :key="reservation.uuid" value="已预约" label="已预约"></el-option>
          <el-option :key="reservation.uuid" value="已签到" label="已签到"></el-option>
          <el-option :key="reservation.uuid" value="已撤销" label="已撤销"></el-option>
          <el-option :key="reservation.uuid" value="未到场" label="未到场"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">查询</el-button>
        <el-button type="primary" @click="clearThem()">清空</el-button>
      </el-form-item>
    </el-form>
    <el-table :key="key"
              v-loading="loading"
              element-loading-text="玩命加载中"
              element-loading-spinner="el-icon-loading"
              :data="reservationList.slice((currentPage-1)*pagesize,currentPage*pagesize)" highlight-current-row style="width: 100%;font-size: 16px">
      <el-table-column type="index" width="100" label="序号">
      </el-table-column>
      <el-table-column
        prop="appointmentHolder"
        label="预约人">
      </el-table-column>
      <el-table-column
        prop="day"
        label="预约日期">
      </el-table-column>
      <el-table-column
        prop="time"
        label="预约时间">
      </el-table-column>
      <el-table-column
        prop="isCome"
        label="到访状态">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>

      <el-table-column
        prop="createTime"
        label="记录交易">
        <template slot-scope="scope">
          <el-button
            @click="dialogVisible = true" type="text"
            size="middle">
            开始称重
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="'交易记录'"
      :visible.sync="dialogVisible"
      width="40%">
      <transaction-dialog-bar v-bind:transactionAndGoodsRight="transactionAndGoods"></transaction-dialog-bar>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false,addTransaction()">确 认 支 付</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {dirReservation, addReservation} from '@/api/reservation'
import TransactionDialogBar from './transactionDialogBar'
export default {
  name: 'ReservationList',
  components: {TransactionDialogBar},
  data() {
    return {
      reservation: {
        day: null,
        time: null,
        isCome: null
      },
      reservationAdd: {
        uuid: '',
        day: null,
        time: null,
        appointmentStation: null
      },
      reservationList: [],
      currentPage: 1,
      pagesize: 10,
      loading: false,
      dialogVisible: false,
      reservationAndStation: {
        reservation: {},
        stationLegal: null,
        stationId: null
      },
      transactionAndGoods: {
        transaction: {},
        transactionGoodsList: []
      }
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
      this.reservation.day = null,
      this.reservation.time = null,
      this.reservation.isCome = null
    },
    addReservation() {
      this.reservationAndStation.reservation =this.reservationAdd
      addReservation(this.reservationAndStation).then((res) => {
        if (res.data.status === 200) {
          this.$message({
            type: 'success',
            message: '预约!'
          })
          this.getAllReservationList()
          this.clearThem()
        }
      }).catch((res) => {
        console.log(res.message)
      })
    }
  }
}
</script>

<style scoped>

</style>
