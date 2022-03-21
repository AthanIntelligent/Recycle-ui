<template>
  <div class="app-container">
    <el-form :inline="true" :model="goods" class="demo-form-inline">
      <el-form-item label="名称">
        <el-input v-model="goods.name" placeholder="物品名称"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <!--从数据库中查-->
        <el-select v-model="goods.type" placeholder="物品类型">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(goods)">查询</el-button>
      </el-form-item>
    </el-form>
    <el-button @click="dialogVisible = true">添加</el-button>
    <!-- 列表数据 goodsList -->
    <el-table :key="key" :data="goodsList" border fit highlight-current-row style="width: 100%">
      <el-table-column
        prop="name"
        label="物品名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="type"
        label="物品类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="desc"
        label="简介">
      </el-table-column>
      <el-table-column
        prop="price"
        label="单价">
      </el-table-column>
      <el-table-column
        prop="img"
        label="物品图片">
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
            @click="delGoods(item.uuid)"
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
        <el-button type="primary" @click="dialogVisible = false,addGoods()"
                   v-if="goods.uuid == ''">确 定</el-button>
        <el-button type="primary" @click="dialogVisible = false,updGoods()" v-else>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import goodsDialogBar from './goodsDialogBar'
import axios from 'axios'

export default {
  components: {'goodsDialogBar': goodsDialogBar},
  data() {
    return {
      goods: {
        uuid: '',
        name: '3',
        type: '可回收',
        img: Object,
        desc: '备注',
        price: 5
      },
      goodsList: [
        {
          uuid: '001',
          name: '1',
          type: '可回收',
          img: Object,
          desc: '备注',
          price: 1
        },
        {
          uuid: '002',
          name: '2',
          type: '可回收',
          img: Object,
          desc: '备注',
          price: 2
        }],
      dialogVisible: false,
      tableData: [
        {
          name: '电池',
          apple: 'apple-10',
          banana: 'banana-10',
          orange: 'orange-10'
        },
        {
          name: '衣服',
          apple: 'apple-20',
          banana: 'banana-20',
          orange: 'orange-20'
        }
      ],
      key: 1 // table key
    }
  },
  created() {
    this.getAllGoods()
  },
  methods: {
    getAllGoods() {
      axios({
        url: 'http://localhost:8080/goods/dirGoods',
        method: 'get'
      }).then(res => {
        this.goodsList = res
      })
    },
    onSubmit(goods) {
      console.log(goods)
      alert('query')
      // 根据条件查询
      axios({
        url: 'http://localhost:8080/goods/dirGoodsBy',
        method: 'get'
      }).then(res => {
        this.goodsList = res
      })
    },
    addGoods() {
      alert('add')
      // axios({
      //   url: 'http://localhost:8080/goods/addGoods',
      //   method: 'post'
      // }).then(res => {
      //   console.log(res)
      // })
    },
    updGoods() {
      alert('upd')
      // axios({
      //   url: 'http://localhost:8080/goods/updGoods',
      //   method: 'post'
      // }).then(res => {
      //   console.log(res)
      // })
    },
    delGoods(uuid) {

    }
  }
}
</script>

<style scoped lang="stylus">
.app-container
  padding 20px
</style>


