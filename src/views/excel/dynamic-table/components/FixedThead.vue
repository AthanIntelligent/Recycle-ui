<template>
  <div class="app-container">
    <el-form :inline="true" :model="goods" class="demo-form-inline">
      <el-form-item label="名称">
        <el-input v-model="goods.goodsName" placeholder="物品名称"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <!--从数据库中查-->
        <el-select v-model="goods.goodsType" @change="goodsTypeHandle(goods.goodsType)"  placeholder="物品类型">
          <el-option v-for="item in goodsTypeList" :key="item.uuid" :value="item.goodsType"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(goods)">查询</el-button>
      </el-form-item>
    </el-form>
    <el-button @click="dialogVisible = true">添加</el-button>
    <el-button @click="">导入</el-button>
    <el-button @click="">导出</el-button>
    <el-button @click="">下载模板</el-button>
    <!-- 列表数据 goodsList -->
    <el-table :key="key" :data="goodsList" highlight-current-row style="width: 100%">
      <el-table-column type="index" width="100" label="序号">
      </el-table-column>
      <el-table-column
        prop="goodsName"
        label="物品名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="goodsType"
        label="物品类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="recycleDetail"
        label="简介">
      </el-table-column>
      <el-table-column
        prop="perMoney"
        label="单价">
      </el-table-column>
      <el-table-column
        prop="pic"
        label="物品图片">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            @click="dialogVisible = true"
            type="text"
            size="small">
            修改
          </el-button>
          <el-button
            @click="delGoods(scope.row.uuid)"
            type="text"
            size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--物品添加 物品修改-->
    <el-dialog
      :title="goods.uuid == ''?'添加物品':'修改物品'"
      :visible.sync="dialogVisible"
      width="30%">
      <goodsDialogBar v-bind:goods="goods"></goodsDialogBar>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false,addGoods(goods)"
                   v-if="goods.uuid == ''">确 定</el-button>
        <el-button type="primary" @click="dialogVisible = false,updGoods(goods)" v-else>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import goodsDialogBar from './goodsDialogBar'
import {dirGoods, addGoods, delGoods, updGoods} from '@/api/goods'
import {dirGoodsType} from '@/api/goodstype'

export default {
  components: {'goodsDialogBar': goodsDialogBar},
  data() {
    return {
      goods: {
        goodsType: null,
        goodsName: null,
      },
      goodsList: [],
      goodsTypeList: [],
      dialogVisible: false,
      key: 1 // table key
    }
  },
  created() {
    this.getAllGoods()
    this.getAllGoodsType()
  },
  methods: {
    goodsTypeHandle(goodsType) {
      console.log(goodsType,111)
      for(var i=0;i<this.goodsTypeList;i++){
        if(goodsType === this.goodsTypeList[i].goodsType){
          alert(1234)
          this.goods.goodsType = this.goodsTypeList[i].uuid;
        }
      }
      alert(this.goods.goodsType)
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
    getAllGoodsType(){
      dirGoodsType().then((res) => {
        if (res.data.status === 200) {
          this.goodsTypeList = res.data.data
        }
      }).catch((res) => {
        console.log(res.message)
      })
    },
    onSubmit(goods) {
      alert(this.goods.goodsType)
      // 根据条件查询物品
      dirGoods(goods).then((res) => {
        if (res.data.status === 200) {
          this.goodsList = res.data.data
        }
      }).catch((res) => {
        console.log(res.message)
      })
    },
    addGoods() {
      alert('add')
      addGoods().then((res) => {
      }).catch((res) => {
        console.log(res.message)
      })
    },
    updGoods() {
      alert('upd')
      updGoods().then((res) => {
      }).catch((res) => {
        console.log(res.message)
      })
    },
    delGoods(uuid) {
      delGoods(uuid).then((res) => {
      }).catch((res) => {
        console.log(res.message)
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.app-container
  padding 20px
</style>


