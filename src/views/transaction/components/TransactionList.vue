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
      <el-form-item label="支付状态">
        <el-select v-model="transactionSelect.payFlag">
          <el-option value="未支付">未支付</el-option>
          <el-option value="已支付">已支付</el-option>
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

    <el-drawer
      title="物品交易详情"
      :visible.sync="drawer"
      :with-header="false">
      <transaction-goods-dialog-bar :transactionGoodsListRight="transactionGoodsList"></transaction-goods-dialog-bar>
    </el-drawer>

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
import Transaction from "../index";
import TransactionGoodsDialogBar from "./transactionGoodsDialogBar";
export default {
name: "TransactionList",
  components: {TransactionGoodsDialogBar, Transaction},
  data() {
    return {
      transactionSelect: {
        transactionTime: null,
        userId: null,
        payFlag: null
      },
      transaction: {
        uuid: '',
        userId: null,
        stationId: null,
        transactionTime: null,
        stationLegal: null,
        allMoney: null,
        payFlag: null
      },
      transactionList: [],
      transactionGoodsList: [],
      key: 1,
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
        if (res.data.status !== 200) {
          this.accountTip('warning','提示','请输入列表中存在的用户');
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
        this.transactionSelect.payFlag = null
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

</style>
