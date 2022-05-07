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
      <el-form-item label="用户姓名">
        <el-input v-model="transactionSelect.userId"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">查询</el-button>
        <el-button type="primary" @click="clearThem()">清空</el-button>
      </el-form-item>
    </el-form>
    <el-button @click="dialogVisible = true">添加</el-button>
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
        prop="userId"
        label="用户">
      </el-table-column>
      <el-table-column
        prop="stationLegal"
        label="基站法人">
      </el-table-column>
      <el-table-column
        prop="transactionTime"
        label="交易时间">
      </el-table-column>
    </el-table>

    <el-drawer
      title="物品交易详情"
      :visible.sync="drawer"
      :with-header="false">
      <transaction-goods-dialog-bar :transactionGoodsListRight="transactionGoodsList"></transaction-goods-dialog-bar>
    </el-drawer>

<!--    <el-dialog-->
<!--      :title="reservationAdd.uuid == ''?'预约':'修改预约'"-->
<!--      :visible.sync="dialogVisible"-->
<!--      width="30%">-->
<!--      &lt;!&ndash;这里需要把选中的基站id或名称传过去&ndash;&gt;-->
<!--      <reservation-dialog-bar v-bind:reservationD="reservationAdd"></reservation-dialog-bar>-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-button @click="dialogVisible = false">取 消</el-button>-->
<!--        <el-button type="primary" @click="dialogVisible = false,addReservation()"-->
<!--                   v-if="reservationAdd.uuid == ''">确 定</el-button>-->
<!--        <el-button type="primary" @click="dialogVisible = false,updReservation()" v-else>确 定</el-button>-->
<!--      </span>-->
<!--    </el-dialog>-->
  </div>
</template>

<script>
import {dirTransaction, getTransactionGoods, addTransaction} from '@/api/transaction'
import Transaction from "../index";
import transactionGoodsDialogBar from "./transactionGoodsDialogBar";
import TransactionGoodsDialogBar from "./transactionGoodsDialogBar";
export default {
name: "TransactionList",
  components: {TransactionGoodsDialogBar, Transaction},
  data() {
    return {
      transactionSelect: {
        transactionTime: null,
        userId: null
      },
      transaction: {
        uuid: '',
        userId: null,
        stationId: null,
        transactionTime: null,
        stationLegal: null
      },
      transactionList: [],
      transactionGoodsList: [],
      currentPage: 1,
      pagesize: 10,
      loading: false,
      dialogVisible: false,
      drawer: false
    }
  },
  created() {
    this.getAllTransactionList()
  },
  methods: {
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
      this.transactionSelect.transactionTime = null,
        this.transactionSelect.userId = null
    },
    getTransactionGoods(uuid) {
      getTransactionGoods(uuid).then((res) => {
        if (res.data.status === 200) {
          this.transactionGoodsList = res.data.data
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
