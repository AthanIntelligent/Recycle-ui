<template>
  <el-card class="box-card" style="margin-top: 50px">
    <div slot="header" class="clearfix" style="color: palevioletred;font-size: 16px;font-weight:bold;">
      <span>用户交易详情</span>
    </div>
    <div class="text item">
      <el-table :data="transactionGoodsListRight" :key="goods">
        <el-table-column type="index" width="100" label="序号">
        </el-table-column>
        <el-table-column
          prop="goodsId"
          label="物品名称">
        </el-table-column>
        <el-table-column
          prop="weight"
          label="物品重量">
        </el-table-column>
        <el-table-column
          prop="money"
          label="物品金额">
        </el-table-column>
      </el-table>
    </div>
    <el-button type="text">总金额：{{allMoneyRight}}</el-button>
  </el-card>
</template>

<script>
export default {
  name: "transactionGoodsDialogBar",
  props: {
    transactionGoodsListRight: [],
    allMoneyRight: null
  }
}
</script>

<style scoped>

</style>
