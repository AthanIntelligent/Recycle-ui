<template>
  <div class="app-container">
    <el-form :inline="true" :model="transactionSelect" class="demo-form-inline">
      <el-form-item label="交易日期">
        <el-date-picker
          v-model="transactionSelect.transactionTime"
          type="date"
          placeholder="交易日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd">
        </el-date-picker>
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
              :data="transactionList.slice((currentPage-1)*pagesize,currentPage*pagesize)" highlight-current-row style="width: 100%;font-size: 16px">
      <el-table-column type="index" width="100" label="序号">
      </el-table-column>
      <el-table-column
        prop="legal"
        label="交易物品详情"
        width="180">
        <template slot-scope="scope">
          <el-button
            @click="drawer = true, getTransactionGoods(scope.row.uuid)" type="text"
            size="middle">
            查看交易物品
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="stationLegal"
        label="基站法人">
      </el-table-column>
      <el-table-column
        prop="stationId"
        label="基站详情">
        <template slot-scope="scope">
          <el-button
            @click="drawer2 = true, getStationDetail(scope.row.stationId)" type="text"
            size="middle">
            查看基站详情
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="allMoney"
        label="总交易金额">
      </el-table-column>
      <el-table-column
        prop="payFlag"
        label="支付状态">
      </el-table-column>
      <el-table-column
        prop="transactionTime"
        label="交易时间">
      </el-table-column>
    </el-table>

    <el-dialog
      title="物品交易详情"
      :visible.sync="drawer"
      width="30%">
      <transaction-goods-dialog-bar :transactionGoodsListRight="transactionGoodsList"></transaction-goods-dialog-bar>
    </el-dialog>

    <el-dialog
      title="基站详情"
      :visible.sync="drawer2"
      width="30%">
      <station-dialog-bar :stationRight="station"></station-dialog-bar>
    </el-dialog>

    <el-pagination
      style="position: absolute;right:660px;bottom:15px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="transactionList.length">
    </el-pagination>
  </div>
</template>

<script>
import {dirTransaction, getTransactionGoods} from '@/api/transaction'
import {getStationDetail} from '@/api/station'
import TransactionGoodsDialogBar from "./transactionGoodsDialogBar";
import stationDialogBar from './stationDialogBar'
import StationDialogBar from "./stationDialogBar";
export default {
  name: "TradeList",
  components: {StationDialogBar, TransactionGoodsDialogBar},
  data() {
    return {
      transactionSelect: {
        transactionTime: null
      },
      transactionList: [],
      transactionGoodsList: [],
      currentPage: 1,
      pagesize: 10,
      loading: false,
      dialogVisible: false,
      drawer: false,
      drawer2: false,
      station: {
        uuid: null,
        stationName: null,
        stationLegal: null,
        stationAddress: null,
        openFlag: null,
        createTime: null
      }
    }
  },
  created() {
    this.getAllTransactionList();
  },
  methods: {
    handleSizeChange: function (size) {
      this.pagesize = size
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    getAllTransactionList() {
      dirTransaction(this.transactionSelect).then((res) => {
        if (res.data.status === 200) {
          this.transactionList = res.data.data
          this.loading = false
        }
      }).catch((res) => {
        console.log(res.message)
      })
    },
    onSubmit() {
      this.getAllTransactionList()
    },
    clearThem() {
      this.transactionSelect.transactionTime = null
    },
    getTransactionGoods(uuid) {
      getTransactionGoods(uuid).then((res) => {
        if (res.data.status === 200) {
          this.transactionGoodsList = res.data.data
        }
      }).catch((res) => {
        console.log(res.message)
      })
    },
    getStationDetail(uuid) {
      getStationDetail(uuid).then((res) => {
        if (res.data.status === 200) {
          this.station = res.data.data.station
          if (this.station.openFlag == '1') {
            this.station.openFlag = '开启'
          }
          if (this.station.openFlag == '2') {
            this.station.openFlag = '关闭'
          }
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
