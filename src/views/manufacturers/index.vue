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
    <el-button @click="isExistGoods"  :loading="goodsList.length>0?false:true">添加</el-button>
    <el-table
      v-loading="loading2"
      element-loading-text="玩命加载中"
      element-loading-spinner="el-icon-loading"
      :data="manufactures"
      highlight-current-row
      style="width: 100%;font-size: 16px">
      <el-table-column type="index" width="80" label="序号" align="center">
      </el-table-column>
      <el-table-column
        prop="factureName"
        label="厂商名称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="factureAddress"
        label="厂址"
        align="center">
      </el-table-column>
      <el-table-column
        prop="facturePhone"
        label="联系电话"
        align="center">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        align="center">
      </el-table-column>
      <el-table-column
        prop="uuid"
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button
            @click="toRemove(scope.row)" type="text"
            size="middle">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-pagination
      style="position: absolute;right:660px;bottom:15px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="manufactures.length">
    </el-pagination>
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
import {dirManufacture,delManufacture} from "@/api/manufacture"
export default {
  components:{
    manufactureDialogBar
  },
  data() {
    return {
      dialogVisible:false,
      currentPage: 1,
      pagesize: 10,
      loading2: true,
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
        this.loading2 = false
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
      this.query(this.manufacture)
    },
    isExistGoods(){
      if(this.goodsList.length>0){
        this.dialogVisible = true
      }else{
        this.accountTip('warning','提示','还未获取到物品列表，请耐心等待');
        this.dialogVisible = false
      }
    },
    handleSizeChange: function (size) {
      this.pagesize = size
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    toRemove(value){
      delManufacture(value.uuid).then(res => {
        if(res.data.status === 200){
          this.accountTip('success','成功','删除成功')
          this.query(this.manufacture);
        }
      }).catch(err => {
        this.accountTip('error','失败',err.message)
      })
    },
    accountTip(type,title,info) {
      this.$notify({
        title: title,
        dangerouslyUseHTMLString: true,
        message: '<strong>提示：<i>'+info+'</i></strong>',
        type: type,
        position: 'top-right',
        offset: 150
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.app-container
  padding 20px
</style>


