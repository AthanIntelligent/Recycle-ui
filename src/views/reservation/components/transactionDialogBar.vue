<template>
  <div class="app-container">
    <el-form :model="transactionAndGoodsRight" ref="goodsType" label-width="80px" class="demo-ruleForm">
      <el-form-item label="交易物品" prop="type">
        <el-select
          v-model="selectedGoods"
          multiple
          collapse-tags
          style="margin-left: 20px;width: 300px"
          @change="showGoodsSome()"
          placeholder="请选择交易物品">
          <el-option
            v-for="goods in goodsList"
            :item="goods"
            :key="goods.uuid"
            :label="goods.goodsName"
            :value="goods.uuid+','+goods.goodsName+','+goods.perMoney+','+goods.unit"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-table :data="tranSelectedGoods">
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
            <el-input type="number" style="width: 105px;" v-model="scope.row.goodsWeight"  @blur="scope.row.amount=(scope.row.goodsWeight*scope.row.goodsPrice);totalAmount+=scope.row.amount"></el-input>{{scope.row.goodsUnit!=null?" "+scope.row.goodsUnit.split('/')[1]:''}}
          </template>

        </el-table-column>
        <el-table-column
          prop="amount"
          label="金额">
          <template  slot-scope="scope">
            <div v-if="scope.row.amount>=0&&scope.row.amount!=null">￥{{scope.row.amount}}</div>
          </template>
        </el-table-column>
      </el-table>

      <el-form-item label="总金额：" prop="type">
        <div v-if="totalAmount>=0&&totalAmount!=null">￥{{totalAmount}}</div>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="toPay()">确 认 支 付</el-button>
    </span>
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
      selectedGoods: [],
      tranSelectedGoods:[],
      totalAmount:null
    }
  },
  created() {
    this.getAllGoods()
  },
  methods: {
    toPay(){
      if(this.totalAmount==null||this.totalAmount<=0){
        return;
      }
      this.$router.push({path: '/alipay',query: {totalAmount: this.totalAmount,goodsInfo:this.tranSelectedGoods}})
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
      let len = this.selectedGoods.length
      // console.log(len+","+this.tranSelectedGoods.length)
      var isAdded = false
      console.log(len)
      if(len>0){
          let goodsItem = []
          goodsItem = this.selectedGoods[len - 1].toString().split(',')
          let str = {
            uuid: goodsItem[0],
            goodsName: goodsItem[1],
            goodsPrice: goodsItem[2],
            goodsUnit: goodsItem[3],
            goodsWeight: null,
            amount: null
          }
          if(this.tranSelectedGoods.length>len){
            isAdded = true
          }
          if(!isAdded) {
            this.tranSelectedGoods[len - 1] = str
          }else{
            this.tranSelectedGoods = []
            for(var i=0;i<this.selectedGoods.length;i++){
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
              this.tranSelectedGoods[i]=str;
            }
          }
      }else{
        this.tranSelectedGoods = []
      }
      this.tranSelectedGoods = JSON.parse(JSON.stringify(this.tranSelectedGoods))
      console.log(this.tranSelectedGoods)
    }
  }
}
</script>

<style scoped>
.dialog-footer{
  display: flex;
  justify-content: right;
}
</style>
