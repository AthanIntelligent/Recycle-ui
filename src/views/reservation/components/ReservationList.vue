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
    <el-table
              v-loading="loading"
              element-loading-text="玩命加载中"
              element-loading-spinner="el-icon-loading"
              :data="reservationList"
              highlight-current-row
              style="width: 100%;font-size: 16px">
      <el-table-column type="index" width="80" label="序号" align="center">
      </el-table-column>
      <el-table-column
        prop="appointmentHolder"
        label="预约人"
        align="center">
      </el-table-column>
      <el-table-column
        prop="day"
        label="预约日期"
        align="center">
      </el-table-column>
      <el-table-column
        prop="time"
        label="预约时间"
        align="center">
      </el-table-column>
      <el-table-column
        prop="isCome"
        label="到访状态"
        align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.isCome=='已签到'" style="color: #13ce66">{{scope.row.isCome}}</span>
          <span v-if="scope.row.isCome=='已预约'" style="color: #1d7ac2">{{scope.row.isCome}}</span>
          <span v-if="scope.row.isCome=='已撤销'" style="color: #6c757d">{{scope.row.isCome}}</span>
          <span v-if="scope.row.isCome=='未到场'" style="color: #555555">{{scope.row.isCome}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        align="center">
      </el-table-column>

      <el-table-column
        prop="createTime"
        label="操作"
      align="center">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.isCome=='已预约' && scope.row.day == today"
            @click="toComputeWeight(scope.row)" type="text"
            size="middle">
            开始称重
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="'操作'"
      :visible.sync="dialogVisible"
      width="40%">
      <transaction-dialog-bar @closeDialog="toCloseDialog" v-bind:reservationInfo="reservationInfo"></transaction-dialog-bar>
    </el-dialog>

    <el-pagination
      style="position: absolute;right:660px;bottom:15px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="reservationList.length">
    </el-pagination>
  </div>
</template>

<script>
import {dirReservation} from '@/api/reservation'
import TransactionDialogBar from './transactionDialogBar'
export default {
  name: 'ReservationList',
  components: {TransactionDialogBar},
  data() {
    return {
      today: null,
      key: 1,
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
      reservationInfo: {},
      currentPage: 1,
      pagesize: 10,
      loading: true,
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
    this.getToday()
  },
  methods: {
    getToday() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();

      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + "-" + month + "-" + strDate;
      this.today = currentdate;
      console.log(this.today)
    },
    toComputeWeight(val){
      this.reservationInfo = val;
      this.dialogVisible = true;
    },
    handleSizeChange: function (size) {
      this.pagesize = size
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    toCloseDialog(v){
      this.dialogVisible = !v
      this. getAllReservationList();
    },
    getAllReservationList() {
      dirReservation(this.reservation).then((res) => {
        if (res.data.status == 200) {
          this.reservationList = res.data.data
            this.reservationList.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
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
    }
  }
}
</script>

<style scoped>

</style>
