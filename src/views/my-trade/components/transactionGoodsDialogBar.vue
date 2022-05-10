<template>
   <div class="app-container">
    <div class="text item">
      <el-table :data="transactionGoodsListRight" style="font-size: 16px">
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
   </div>
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
