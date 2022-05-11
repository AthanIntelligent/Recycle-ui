<template>
  <div class="app-container">
    <el-form label-width="80px" class="demo-ruleForm">
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
            {{ scope.row.goodsPrice }}{{ scope.row.goodsUnit }}
          </template>
        </el-table-column>
        <el-table-column
          prop="goodsWeight"
          label="重量"
          width="185">
          <template slot-scope="scope">
            <el-input type="number" style="width: 105px;" v-model="scope.row.goodsWeight"
                      @blur="scope.row.amount=(scope.row.goodsWeight*scope.row.goodsPrice);totalAmount+=scope.row.amount"></el-input>
            {{ scope.row.goodsUnit != null ? " " + scope.row.goodsUnit.split('/')[1] : '' }}
          </template>

        </el-table-column>
        <el-table-column
          prop="amount"
          label="金额">
          <template slot-scope="scope">
            <div v-if="scope.row.amount>=0&&scope.row.amount!=null">￥{{ scope.row.amount }}</div>
          </template>
        </el-table-column>
      </el-table>

      <el-form-item label="总金额：" prop="type">
        <div v-if="totalAmount>=0&&totalAmount!=null">￥{{ totalAmount }}</div>
      </el-form-item>
      <el-form-item label="是否已付款:" label-width="280" required>
        <el-radio v-model="payStatus" label="已支付" value="已支付">已支付</el-radio>
        <el-radio v-model="payStatus" label="未支付" value="未支付">未支付</el-radio>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="toPay()">录入交易</el-button>
        <el-button @click="clearThem">重置</el-button>
    </span>
  </div>
</template>

<script>
import {dirGoods} from '@/api/goods'
import {addTransaction} from '@/api/transaction'
export default {
  name: 'transactionDialogBar',
  props: {
    reservationInfo: {
      reservationInfo: {}
    }
  },
  data() {
    return {
      goods: {},
      goodsList: [],
      selectedGoods: [],
      tranSelectedGoods: [],
      totalAmount: null,
      payStatus: '',
      transactionAndGoods: {
        reservation: {},
        transactionGoodsList: [],
        allMoney: null,
        payFlag: null
      }
    }
  },
  created() {
    this.getAllGoods()
  },
  methods: {
    toPay() {
      if (this.totalAmount == null || this.totalAmount <= 0) {
        this.accountTip('warning', '提示', '你还没有添加任何物品');
        return;
      }
      if (this.payStatus.toString().trim() == '') {
        this.accountTip('warning', '提示', '请选择付款状态');
        return;
      }
      this.transactionAndGoods.reservation = this.$props.reservationInfo
      this.transactionAndGoods.transactionGoodsList = this.tranSelectedGoods
      this.transactionAndGoods.allMoney = this.totalAmount
      this.transactionAndGoods.payFlag = this.payStatus
      addTransaction(this.transactionAndGoods).then((res) => {
        if (res.data.status === 200) {
          this.accountTip('success', '成功', '交易记录成功');
          this.$emit("closeDialog", true);
          this.clearThem();
        }
      }).catch((res) => {
        console.log(res.message)
      })
      //this.$router.push({path: '/alipay',query: {totalAmount: this.totalAmount,goodsInfo:this.tranSelectedGoods,reservationInfo:this.$props.reservationInfo}})
    },
    clearThem() {
      this.selectedGoods = [],
        this.tranSelectedGoods = [],
        this.totalAmount = null,
        this.payStatus = null
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
      if (len > 0) {
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
        if (this.tranSelectedGoods.length > len) {
          isAdded = true
        }
        if (!isAdded) {
          this.tranSelectedGoods[len - 1] = str
        } else {
          var tran = []
          this.totalAmount = null
          for (var i = 0; i < this.tranSelectedGoods.length; i++) {
            for (var j = 0; j < this.selectedGoods.length; j++) {
              if (this.tranSelectedGoods[i].uuid === this.selectedGoods[j].toString().split(',')[0]) {
                tran.push(this.tranSelectedGoods[i])
                this.totalAmount += this.tranSelectedGoods[i].amount
              }
            }
          }
          this.tranSelectedGoods = tran;
        }
      } else {
        this.tranSelectedGoods = []
      }
      this.tranSelectedGoods = JSON.parse(JSON.stringify(this.tranSelectedGoods))
      console.log(this.tranSelectedGoods)
    },
    accountTip(type, title, info) {
      this.$notify({
        title: title,
        dangerouslyUseHTMLString: true,
        message: '<strong>提示：<i>' + info + '</i></strong>',
        type: type,
        position: 'top-right',
        offset: 80
      })
    }
  }
}
</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: right;
}
</style>
