<template>
  <div class="app-container">
    <el-form :model="transactionAndGoodsRight" ref="goodsType" label-width="100px" class="demo-ruleForm">
      <el-form-item label="交易物品" prop="type">
        <el-select v-model="selectedGoods" multiple placeholder="请选择交易物品" @change="showGoodsSome()" style="width: 300px">
          <el-option
            v-for="goods in goodsList"
            :key="goods.uuid"
            :label="goods.goodsName"
            :value="goods.uuid+','+goods.goodsName+','+goods.perMoney+','+goods.unit"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-table :data="selectedGoods">
        <el-table-column
          prop="goodsName"
          label="物品名称"
          width="130">
        </el-table-column>
        <el-table-column
          prop="goodsPrice"
          label="单价"
          width="130">
          <template slot-scope="scope">
            {{scope.row.goodsPrice}}{{scope.row.goodsUnit}}
          </template>
        </el-table-column>
        <el-table-column
          prop="goodsWeight"
          label="重量"
          width="185">
          <template slot-scope="scope">
            <el-input type="number" style="width: 135px;" v-model="scope.row.goodsWeight"  @blur="scope.row.amount=(scope.row.goodsWeight*scope.row.goodsPrice)"></el-input>{{scope.row.goodsUnit.split('/')[1]}}
          </template>

        </el-table-column>
        <el-table-column
          prop="amount"
          label="金额">
          <template  slot-scope="scope">
            {{scope.row.amount}}
          </template>
        </el-table-column>
      </el-table>

      <el-form-item label="总金额：" prop="type">

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {dirGoods} from '@/api/goods'
export default {
  name: 'transactionDialogBar',
  props: {
    transactionAndGoodsRight: {
      transaction: {},
      transactionGoodsList: []
    }
  },
  data() {
    return {
      goods: {},
      goodsList: [],
      selectedGoods: []
    }
  },
  created() {
    this.getAllGoods()
  },
  methods: {
    computeAmount(amount, weight, price) {
      let w = weight * price
      amount = weight * price
      alert(amount)
    },
    getAllGoods() {
      dirGoods(this.goods).then((res) => {
        if (res.data.status === 200) {
          this.goodsList = res.data.data
        }
      }).catch((res) => {
        console.log(res.message)
      })
    },
    showGoodsSome() {
      console.log(this.selectedGoods)
      let len = this.selectedGoods.length

      for(let i = 0; i < len; i++) {
        let goodsItem = []
        goodsItem = this.selectedGoods[i].toString().split(',')
        let str = {
          uuid: goodsItem[0],
          goodsName: goodsItem[1],
          goodsPrice: goodsItem[2],
          goodsUnit: goodsItem[3],
          goodsWeight: null,
          amount: null
        }
        this.selectedGoods[i] = ''
        this.selectedGoods[i] = str
      }
      console.log(this.selectedGoods)
    }
  }
}
</script>

<style scoped>

</style>
