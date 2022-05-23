<template>
  <div>
    <el-table :data="tradeList" :key="goods">
      <el-table-column prop="stationId" type="expand">
        <template slot-scope="prop">

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
import {getFactoryTrade} from '@/api/manufacture'
export default {
  name: "seeTradeDialogBar",
  props: {
    factortyIdRight: null
  },
  data() {
    return {
      tradeList: []
    }
  },
  created() {
    this.getFactoryTrade()
  },
  methods:{
    getFactoryTrade() {
      getFactoryTrade(this.factortyIdRight).then(res => {
        if(res.data.status === 200) {
          this.tradeList = res.data.data
        }
      }).catch(err => {

      })
    }
  }
}
</script>

<style scoped>

</style>
