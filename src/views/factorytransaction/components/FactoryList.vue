<template>
  <div class="app-container">
    <el-form :inline="true" :model="manufacturersSelect" class="demo-form-inline">
      <el-form-item label="厂商名称">
        <el-input v-model="manufacturersSelect.factureName" placeholder="厂商名称"></el-input>
      </el-form-item>
      <el-form-item label="物品名称">
        <el-input v-model="manufacturersSelect.recycleGoodsAndPrice" placeholder="物品名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">查询</el-button>
        <el-button type="primary" @click="clearTwo()">清空</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="loading"
      element-loading-text="玩命加载中"
      element-loading-spinner="el-icon-loading"
      :data="manufacturerList"
      highlight-current-row
      style="width: 100%;font-size: 16px">
      <el-table-column type="index" width="80" label="序号" align="center">
      </el-table-column>
      <el-table-column
        prop="factureName"
        label="厂商名称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="factureAddress"
        label="厂址"
        align="center">
      </el-table-column>
      <el-table-column
        prop="facturePhone"
        label="联系电话"
        align="center">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        align="center">
      </el-table-column>
      <el-table-column
        prop="uuid"
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button
            @click="toTrade(scope.row)" type="text"
            size="middle">
            开始交易
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="dialogVisible">
      <el-dialog
        :title="'记录交易'"
        :visible.sync="dialogVisible"
        width="40%">
        <trade-dialog-bar @dialog="toCloseDialog" :manufacturersRight="manufacturers"></trade-dialog-bar>
      </el-dialog>
    </div>


    <el-pagination
      style="position: absolute;right:660px;bottom:15px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="manufacturerList.length">
    </el-pagination>
  </div>
</template>

<script>
import {dirManufacture} from '@/api/manufacture'
import TradeDialogBar from './tradeDialogBar'
import { getGoodsWeight } from '@/api/transaction'
export default {
  name: 'FactoryList',
  components: {TradeDialogBar},
  comments: {TradeDialogBar},
  data() {
    return {
      manufacturersSelect: {
        factureName: null,
        recycleGoodsAndPrice: null
      },
      manufacturerList: [],
      currentPage: 1,
      pagesize: 10,
      loading: true,
      dialogVisible: false,
      manufacturers: {
        trade: {},
        tradeGoods: []
      },
      totalMoney:0
    }
  },
  created() {
    this.getManufactureList()
  },
  methods: {
    toCloseDialog(v) {
      this.dialogVisible = !v
      this.getManufactureList()
    },
    getManufactureList() {
      dirManufacture(this.manufacturersSelect).then((res) => {
        if (res.data.status === 200) {
          this.manufacturerList = res.data.data
          console.log(this.manufacturerList)
          this.loading = false
        }
      }).catch((res) => {
        console.log(res.data.message)
      })
    },
    dealList(uuid,recycleGoodsAndPrice){
      let list = recycleGoodsAndPrice.split(';')
      for (var i = 0; i < list.length; i++) {
        let m = list[i].split(',')
        var obj ={
          goodsName : m[0],
          perMoney : m[1],
          unit : m[2]
        }
        this.showWeight(m[0],obj)

        this.manufacturers.tradeGoods[i] = obj
      }

      // console.log(this.manufacturers.tradeGoods)
      setTimeout(()=>{
        var trade = {
          factoryId:uuid,
          allMoney : this.totalMoney
        }
        this.manufacturers.trade = trade;
        // console.log(this.manufacturers.trade)
      },1000)

    },
    async showWeight(goodsName,obj) {
      var weight = ''
      await getGoodsWeight(goodsName).then((res) => {
        if (res.data.status === 200) {
          weight = res.data.data
          obj['weight'] = weight;
          obj['rmb'] = weight*obj.perMoney;

        }
      }).catch((res) => {
        console.log(res.data.message)
      })
      this.totalMoney += obj.rmb

      return weight;
    },
    onSubmit() {
      this.getManufactureList()
    },
    clearTwo() {
      this.manufacturersSelect.factureName = null
      this.manufacturersSelect.recycleGoodsAndPrice = null
    },
    toTrade(row) {
      // this.manufacturers.uuid = row.uuid
      // this.manufacturers.recycleGoodsAndPrice = row.recycleGoodsAndPrice
      this.dealList(row.uuid,row.recycleGoodsAndPrice);
      this.dialogVisible = true
    },
    handleSizeChange: function (size) {
      this.pagesize = size
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    }
  }
}
</script>

<style scoped>

</style>
