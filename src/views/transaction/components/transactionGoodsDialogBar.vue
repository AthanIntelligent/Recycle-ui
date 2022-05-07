<template>
  <el-card class="box-card" style="margin-top: 50px">
    <div slot="header" class="clearfix" style="color: palevioletred;font-size: 16px;font-weight:bold;">
      <span>用户交易物品</span>
    </div>
    <div v-for="transactionGoods in transactionGoodsListRight" :key="goods" class="text item">
      <span>{{transactionGoods.goodsId}}</span>
      <span>{{transactionGoods.weight}}</span>
      <span>{{transactionGoods.money}}</span>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "transactionGoodsDialogBar",
  props: {
    transactionGoodsListRight: []
  }
}
</script>

<style scoped>

</style>
