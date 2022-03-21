<template>
  <div class="app-container">
    <el-button @click="dialogVisible = true">添加</el-button>
    <!-- 列表数据 goodsList -->
    <el-table :key="key" :data="goodsTypeList" border fit highlight-current-row style="width: 100%">
      <el-table-column
        prop="type"
        label="物品类型"
        width="502">
      </el-table-column>
      <el-table-column
        prop="include"
        label="类型包括"
        width="502">
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
            @click="delGoodsType()"
            type="text"
            size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--物品类型添加 物品类型修改-->
    <el-dialog
      :title="goodsType.uuid == ''?'添加物品类型':'修改物品类型'"
      :visible.sync="dialogVisible"
      width="30%">
      <goodsTypeDialogBar v-bind:goodsType="goodsType"></goodsTypeDialogBar>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false,addGoodsType()"
                   v-if="goodsType.uuid == ''">确 定</el-button>
        <el-button type="primary" @click="dialogVisible = false,updGoodsType()" v-else>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import goodsTypeDialogBar from './goodsTypeDialogBar'

export default {
  name: 'TypeTable',
  components: {
    goodsTypeDialogBar
  },
  data() {
    return {
      goodsType: {
        uuid: '',
        type: '',
        include: ''
      },
      goodsTypeList: [
        {
          uuid: '001',
          type: '可回收',
          include: '电池，可穿衣物'
        },
        {
          uuid: '002',
          type: '不可回收',
          include: '瓶子'
        }],
      dialogVisible: false,
      key: 1 // table key
    }
  },
  created() {
    this.getAllList()
  },
  methods: {
    getAllList() {
      axios({
        url: 'http://localhost:8080/goods/dirGoodsType',
        method: 'get'
      }).then(res => {
        this.goodsTypeList = res
      })
    },
    onSubmit(goods) {
      console.log(goods)
      // 根据条件查询
      axios({
        url: 'http://localhost:8080/goods/dirGoodsBy',
        method: 'get'
      }).then(res => {
        this.goodsList = res
      })
    },
    addGoodsType() {
      alert('add')
      // axios({
      //   url: 'http://localhost:8080/goods/addGoods',
      //   method: 'post'
      // }).then(res => {
      //   console.log(res)
      // })
    },
    updGoodsType() {
      alert('upd')
      // axios({
      //   url: 'http://localhost:8080/goods/updGoods',
      //   method: 'post'
      // }).then(res => {
      //   console.log(res)
      // })
    },
    delGoodsType(uuid) {

    }
  }
}
</script>

<style scoped lang="stylus">
.app-container
  padding 20px
</style>
