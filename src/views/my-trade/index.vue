<template>
  <div class="container">
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px">
      <el-table-column
        label="序号"
        width="180">
        <template v-slot="scope">
          <span>{{scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="goodsType"
        label="交易废品"
        width="380">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="支付费用"
        width="270">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="支付方式"
        width="270">
      </el-table-column>
      <el-table-column
        prop="tradeTime"
        label="交易时间"
        width="550">
      </el-table-column>
      <el-table-column
        label="交易基站"
        width="580">
        <template v-slot="scope">
          <div>
            {{scope.row.stationName}}
            <span style="color: #3a8ee6">详情</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      tableData: [{
        tradeTime: '2016-05-02',
        goodsType: '王小虎',
        price: '￥10.00元/kg',
        amount: '￥100元',
        stationName:'基站1',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        tradeTime: '2016-05-04',
        goodsType: '王小虎',
        price: '￥10.00元/kg',
        amount: '￥100元',
        stationName:'基站1',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        tradeTime: '2016-05-01',
        goodsType: '王小虎',
        price: '￥10.00元/kg',
        amount: '￥100元',
        stationName:'基站1',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        tradeTime: '2016-05-03',
        goodsType: '王小虎',
        price: '￥10.00元/kg',
        amount: '￥100元',
        stationName:'基站1',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>

<style scoped>
.container{
  width: 100%;
  height: auto;
  background-color: white;
  padding:20px;

}
</style>
