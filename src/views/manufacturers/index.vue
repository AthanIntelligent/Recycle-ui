<template>
  <div class="app-container">
    <el-form :inline="true" :model="manufacture" class="demo-form-inline">
      <el-form-item label="名称">
        <el-input v-model="manufacture.factureName" placeholder="厂家名字"></el-input>
      </el-form-item>
      <el-form-item label="物品">
          <el-input v-model="manufacture.recycleGoodsAndPrice" placeholder="物品名字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query(manufacture)">查询</el-button>
        <el-button type="primary" @click="clear()">清空</el-button>
      </el-form-item>
    </el-form>
    <el-button @click="dialogVisible = true">添加</el-button>
<!--    <el-table -->
<!--              v-loading="loading"-->
<!--              element-loading-text="玩命加载中"-->
<!--              element-loading-spinner="el-icon-loading"-->
<!--              :data="goodsList.slice((currentPage-1)*pagesize,currentPage*pagesize)" highlight-current-row style="width: 100%;font-size: 16px">-->
<!--      <el-table-column type="index" width="100" label="序号">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="goodsName"-->
<!--        label="物品名称"-->
<!--        width="130">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="goodsType"-->
<!--        label="物品类型"-->
<!--        width="130">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="recycleDetail"-->
<!--        label="简介">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="perMoney"-->
<!--        label="单价">-->
<!--        <template slot-scope="scope">-->
<!--          {{scope.row.perMoney+''+scope.row.unit}}-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="pic"-->
<!--        label="物品图片">-->
<!--        <template slot-scope="scope">-->
<!--          <img-->
<!--            class="el-upload-list__item-thumbnail"-->
<!--            :src='path+scope.row.pic' alt="" width="50%"-->
<!--          >-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="remark"-->
<!--        label="备注">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="createUser"-->
<!--        label="创建人">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="createTime"-->
<!--        label="创建时间">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        fixed="right"-->
<!--        label="操作"-->
<!--        width="120">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button-->
<!--            @click="dialogVisible = true, getGoods(scope.row.uuid)"-->
<!--            type="text"-->
<!--            size="middle">-->
<!--            修改-->
<!--          </el-button>-->
<!--          <el-button-->
<!--            @click="delGoods(scope.row.uuid)"-->
<!--            type="text"-->
<!--            size="middle">-->
<!--            删除-->
<!--          </el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--    </el-table>-->
<!--    <el-pagination-->
<!--      style="position: absolute;right:660px;bottom:15px;"-->
<!--      @size-change="handleSizeChange"-->
<!--      @current-change="handleCurrentChange"-->
<!--      :current-page="currentPage"-->
<!--      :page-sizes="[5, 10, 15]"-->
<!--      :page-size="pagesize"-->
<!--      layout="total, sizes, prev, pager, next, jumper"-->
<!--      :total="goodsList.length">-->
<!--    </el-pagination>-->
    <el-dialog
      title="添加厂商"
      :visible.sync="dialogVisible"
      width="45%">
      <manufactureDialogBar v-bind:goodsList="goodsList" @cancelFacture="toCloseDialog"></manufactureDialogBar>
<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-button @click="dialogVisible = false">取 消</el-button>-->
<!--        <el-button type="primary" @click="dialogVisible = false,addGoods()"-->
<!--                   v-if="goodsDeal.uuid == ''">确 定</el-button>-->
<!--        <el-button type="primary" @click="dialogVisible = false,updGoods()" v-else>确 定</el-button>-->
<!--      </span>-->
    </el-dialog>
  </div>
</template>

<script>

import {dirGoods} from "../../api/goods";
import manufactureDialogBar from "./manufactureDialogBar"
import {dirManufacture} from "@/api/manufacture"
export default {
  components:{
    manufactureDialogBar
  },
  data() {
    return {
      dialogVisible:false,
      loading: true,
      manufacture:{
        factureName:'',
        recycleGoodsAndPrice:''
      },
      manufactures:[],
      goodsList:[]
    }
  },
  mounted() {
    //获取所有的物品
    this.getGoods();
    this.query(this.manufacture);
  },
  methods: {
    query(manufacture){
      dirManufacture(manufacture).then(res => {
        this.manufactures = res.data.data
      }).catch(err => {

      })
    },
    clear(){
      this.manufacture.factureName = ''
      this.manufacture.recycleGoodsAndPrice = ''
    },
    getGoods(){
      dirGoods({}).then(res => {
        this.goodsList = res.data.data
      }).catch(err=>{

      })
    },
    toCloseDialog(v){
      this.dialogVisible = !v
    }
  }
}
</script>

<style scoped lang="stylus">
.app-container
  padding 20px
</style>


