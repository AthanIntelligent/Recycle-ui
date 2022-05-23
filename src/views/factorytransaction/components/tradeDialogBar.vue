<template>
  <div class="app-container">
    <el-table :data="tradeGoods" @selection-change="handleSelectionChange" v-loading="isWeight">
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
          {{scope.row.perMoney}} {{scope.row.unit}}
        </template>
      </el-table-column>
      <el-table-column
        prop="weight"
        label="重量/个数"
        width="180">
        <template slot-scope="scope">
          {{scope.row.weight}}
        </template>
      </el-table-column>
      <el-table-column
        prop="rmb"
        label="金额">
        <template slot-scope="scope">
          ￥{{scope.row.rmb}}
        </template>
      </el-table-column>

    </el-table>
    <div style="margin-top: 20px;font-size: 16px" v-if="allMoney>0">
     <span>总金额:</span> {{$props.manufacturersRight.trade.allMoney>0?'￥'+$props.manufacturersRight.trade.allMoney:0}}
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="toPay()">确定</el-button>
    </span>
  </div>
</template>

<script>
import {payStationManufacture} from '@/api/manufacture'
export default {
  name: 'tradeDialogBar',
  props: {
    manufacturersRight: {}
  },
  data() {
    return {
      isWeight:true,
      allMoney:0,
      tradeGoods:[],
      manufacture:{
        trade:{},
        tradeGoods:[]
      }
    }
  },
  methods: {
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.allMoney = 0;
      for(var i=0;i<selection.length;i++){
        this.allMoney +=selection[i].rmb
      }
      this.manufacture.tradeGoods= selection
      this.$props.manufacturersRight.trade.allMoney=this.allMoney;
    },
    toPay(){
      this.manufacture.trade = this.$props.manufacturersRight.trade;
      if(this.manufacture.tradeGoods.length===0){
        this.accountTip('warning','提示','请选择你要卖出的废品')
        return;
      }
      console.log(this.manufacture,111)

      payStationManufacture(this.manufacture).then(res=>{
        if (res.data.status === 200) {
          this.accountTip('success','成功','交易成功!')
          this.$emit('dialog',true)
        }
      }).catch(err=>{

      })
    },
    accountTip(type,title,info) {
      this.$notify({
        title: title,
        dangerouslyUseHTMLString: true,
        message: '<strong>提示：<i>'+info+'</i></strong>',
        type: type,
        position: 'top-right',
        offset: 80
      })
    }
  },
  mounted() {
    setTimeout(()=>{
      this.tradeGoods = this.$props.manufacturersRight.tradeGoods;
      console.log(this.tradeGoods)
      this.isWeight = false
    },1000)

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
