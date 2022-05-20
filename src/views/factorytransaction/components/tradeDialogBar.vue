<template>
  <div class="app-container">
    <el-table :data="showGoodsAndPrice" @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="50">
      </el-table-column>
      <el-table-column
        prop="goodsName"
        label="物品名称"
        width="130">
      </el-table-column>
      <el-table-column
        prop="perMoney"
        label="单价"
        width="120">
        <template slot-scope="scope">
          {{ scope.row.perMoney }} / {{ scope.row.unit }}
        </template>
      </el-table-column>
      <el-table-column
        prop="weight"
        label="重量"
        width="180">
        <template slot-scope="scope">
          <el-input type="number" style="width: 105px;" v-model="scope.row.weight" @blur="showWeight(scope.row.goodsName)"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="amount"
        label="金额">
      </el-table-column>
    </el-table>

<!--    <span slot="footer" class="dialog-footer">-->
<!--        <el-button type="primary" @click="toPay()">录入交易</el-button>-->
<!--        <el-button @click="clearThem()">重置</el-button>-->
<!--    </span>-->
  </div>
</template>

<script>
import { getGoodsWeight } from '@/api/transaction'
export default {
  name: 'tradeDialogBar',
  props: {
    manufacturersRight: {
      uuid: null,
      recycleGoodsAndPrice: null
    }
  },
  data() {
    return {
      showGoodsAndPrice: [],
      selectedGoodsAndPrice: []
    }
  },
  created() {
    this.dealList()
  },
  methods: {
    dealList() {
      let list = this.manufacturersRight.recycleGoodsAndPrice.split(';')
      for (let i = 0; i < list.length; i++) {
        // eslint-disable-next-line no-new-object
        let obj = new Object()
        let m = list[i].split(',')
        obj.goodsName = m[0]
        obj.perMoney = m[1]
        obj.unit = m[2]
        this.showGoodsAndPrice[i] = obj
      }
      console.log(this.showGoodsAndPrice)
    },
    showWeight(goodsName) {
      getGoodsWeight(goodsName).then((res) => {
        if (res.data.status === 200) {
          alert(res.data.data)
          return res.data.data
        }
      }).catch((res) => {
        console.log(res.data.message)
      })
    },
    // 多选框选中数据
    handleSelectionChange(selection) {

    }
  }
}
</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: right;
  margin-top: 15px;
}
</style>
