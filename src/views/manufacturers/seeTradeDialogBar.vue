<template>
  <div>
    <el-table :data="tradeList"
              :row-key='getRowKeys'
              :expand-row-keys="expands"
              @expand-change="expandChange">
      <el-table-column prop="uuid" type="expand">
        <template slot-scope="props">
          <el-table :data="tradeGoodsList" border :header-cell-style="{background: '#fff7cc',color:'#e83e8c'}"style="color: #6610f2;">
            <el-table-column prop="goodsName" label="物品名称"></el-table-column>
            <el-table-column prop="perMoney" label="单价"></el-table-column>
            <el-table-column prop="unit" label="单位"></el-table-column>
            <el-table-column prop="weight" label="重量 / 个数"></el-table-column>
            <el-table-column prop="rmb" label="金额"></el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column
        prop="stationId"
        label="基站名称">
      </el-table-column>
      <el-table-column
        prop="stationLegal"
        label="基站法人">
      </el-table-column>
      <el-table-column
        prop="allMoney"
        label="交易金额">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="交易时间">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getFactoryTrade, getTradeGoods} from '@/api/manufacture'
export default {
  name: "seeTradeDialogBar",
  props: {
    factortyIdRight: null
  },
  data() {
    return {
      tradeList: [],
      tradeGoodsList: [],
      expands: [],
      getRowKeys (row) {
        return row.uuid
      }
    }
  },
  created() {
    this.getFactoryTrade()
  },
  methods: {
    getFactoryTrade() {
      getFactoryTrade(this.factortyIdRight).then(res => {
        if(res.data.status === 200) {
          this.tradeList = res.data.data
        }
      }).catch(res => {
        console.log(res.data.message)
      })
    },
    showTradeGoods(uuid) {
      getTradeGoods(uuid).then((res) => {
        if(res.data.status === 200) {
          this.tradeGoodsList = res.data.data
        }
      }).catch(res => {
        console.log(res.data.message)
      })
    },
    // expandChange方法当前用小图标控制显隐
    expandChange (row, expandedRows) {
      let _this = this
      if (expandedRows.length) {
        _this.expands = []
        if (row) {
          _this.expands.push(row.uuid)
        }
      } else {
        _this.expands = []
      }
      if (_this.expands.length > 0) {
        this.showTradeGoods(row.uuid)
      }
    }
  }
}
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
