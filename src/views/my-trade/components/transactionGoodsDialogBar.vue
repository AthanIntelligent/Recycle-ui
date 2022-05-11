<template>
   <div class="app-container">
    <div class="text item">
      <el-table :data="transactionGoodsListRight" style="font-size: 16px">
        <el-table-column type="index" width="60" label="序号">
        </el-table-column>
        <el-table-column
          prop="goodsId"
          label="物品名称">
        </el-table-column>
        <el-table-column
          prop="money"
          label="物品单价">
          <template slot-scope="scope">
            {{scope.row.money + scope.row.unit}}
          </template>
        </el-table-column>
        <el-table-column
          prop="weight"
          label="重量/个数">
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
