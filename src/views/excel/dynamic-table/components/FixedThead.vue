<template>
  <div class="app-container">
    <el-form :inline="true" :model="goods" class="demo-form-inline">
      <el-form-item label="名称">
        <el-input v-model="goods.goodsName" placeholder="物品名称"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="goods.goodsType" placeholder="物品类型">
          <el-option v-for="item in goodsTypeList" :key="item.uuid" :value="item.goodsType"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建人">
        <el-select v-model="goods.createUser" placeholder="创建人">
          <el-option v-for="item in stationUserList" :key="item.uuid" :value="item.uuid" :label="item.realName">{{item.realName}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(goods)">查询</el-button>
        <el-button type="primary" @click="clearTwo()">清空</el-button>
      </el-form-item>
    </el-form>
    <el-button @click="dialogVisible = true">添加</el-button>
<!--    <el-button @click="">导入物品</el-button>-->
<!--    <el-button @click="">导出物品</el-button>-->
<!--    <el-button @click.prevent="getTemplate">下载模板</el-button>-->
    <el-table :key="key"
              v-loading="loading"
              element-loading-text="玩命加载中"
              element-loading-spinner="el-icon-loading"
              :data="goodsList.slice((currentPage-1)*pagesize,currentPage*pagesize)" highlight-current-row style="width: 100%;font-size: 16px">
      <el-table-column type="index" width="70" label="序号">
      </el-table-column>
      <el-table-column
        prop="goodsName"
        label="物品名称"
        width="100">
      </el-table-column>
      <el-table-column
        prop="goodsType"
        label="物品类型"
        width="120">
      </el-table-column>
      <el-table-column
        prop="recycleDetail"
        label="简介">
      </el-table-column>
      <el-table-column
        prop="perMoney"
        label="单价">
        <template slot-scope="scope">
          {{scope.row.perMoney+''+scope.row.unit}}
        </template>
      </el-table-column>
      <el-table-column
        prop="pic"
        label="物品图片">
        <template slot-scope="scope">
          <img
            class="el-upload-list__item-thumbnail"
           :src='path+scope.row.pic' alt="" width="50%"
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
      </el-table-column>
      <el-table-column
        prop="createUser"
        label="创建人">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
      width="150px">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            @click="dialogVisible = true, getGoods(scope.row.uuid)"
            type="text"
            size="middle">
            修改
          </el-button>
          <el-button
            @click="delGoods(scope.row.uuid)"
            type="text"
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
      :total="goodsList.length">
    </el-pagination>

    <!--物品添加 物品修改-->
    <el-dialog
      :title="goodsDeal.uuid == ''?'添加物品':'修改物品'"
      :visible.sync="dialogVisible"
      width="30%">
      <goodsDialogBar v-bind:goods="goodsDeal"></goodsDialogBar>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false,addGoods()"
                   v-if="goodsDeal.uuid == ''">确 定</el-button>
        <el-button type="primary" @click="dialogVisible = false,updGoods()" v-else>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import goodsDialogBar from './goodsDialogBar'
import {dirGoods, addGoods, delGoods, updGoods, getGoods} from '@/api/goods'
import {dirGoodsType} from '@/api/goodstype'
import {getTemplate, importG} from '@/api/goodsexcel'
import {dirStationUserList} from '@/api/userA'

export default {
  components: {'goodsDialogBar': goodsDialogBar},
  data() {
    return {
      goods: {
        goodsType: null,
        goodsName: null,
        createUser: null
      },
      goodsDeal: {
        uuid: '',
        goodsType: '',
        goodsName: '',
        pic: '',
        recycleDetail: '',
        perMoney: null,
        unit: null,
        remark: ''
      },
      goodsList: [],
      goodsTypeList: [],
      stationUserList: [],
      currentPage: 1,
      pagesize: 10,
      dialogVisible: false,
      key: 1, // table key
      path: "/static/image/goodImg/",
      loading: true
    }
  },
  created() {
    this.getAllGoods()
    this.getAllGoodsType()
    this.getStationUserList()
  },
  methods: {
    // import() {
    //   importG().then((res) => {
    //   }).catch((res) => {
    //     console.log(res.data.message)
    //   })
    // },
    getTemplate(){
      getTemplate().then((res) => {
      }).catch((res) => {
        console.log(res.data.message)
      })
    },
    handleSizeChange: function (size) {
      this.pagesize = size
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
    },
    getStationUserList() {
      dirStationUserList().then((res) => {
        if (res.data.status === 200) {
          this.stationUserList = res.data.data
          console.log(res.data)
        }
      }).catch((res) => {
        console.log(res.message)
      })
    },
    getAllGoods() {
      dirGoods(this.goods).then((res) => {
        if (res.data.status === 200) {
          this.goodsList = res.data.data
          this.loading = false
        }
      }).catch((res) => {
        console.log(res.message)
      })
    },
    getAllGoodsType() {
      dirGoodsType().then((res) => {
        if (res.data.status === 200) {
          this.goodsTypeList = res.data.data
        }
      }).catch((res) => {
        console.log(res.message)
      })
    },
    onSubmit(goods) {
      console.log(goods)
      dirGoods(goods).then((res) => {
        if (res.data.status === 200) {
          this.goodsList = res.data.data
        }
      }).catch((res) => {
        console.log(res.message)
      })
    },
    clearTwo() {
      this.goods.goodsType = null
      this.goods.goodsName = null
    },
    addGoods() {
      // alert("add")
      addGoods(this.goodsDeal).then((res) => {
        if (this.goodsDeal.goodsName == ''){
          this.$message({
            type: 'error',
            message: '物品名称为必填项!'
          })
          return;
        }
        if (this.goodsDeal.goodsType == ''){
          this.$message({
            type: 'error',
            message: '物品类型为必选项!'
          })
          return;
        }
        if (res.data.status == 200){
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.getAllGoods()
          this.clearGoodsDeal()
        }
        if (res.data.status != 200){
          this.$message({
            type: 'info',
            message: res.data.message
          });
        }
      }).catch((res) => {
        console.log(res.data.message)
      })
    },
    updGoods() {
      // alert('upd')
      updGoods(this.goodsDeal).then((res) => {
        if (res.data.status == 200){
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
        }
        if (res.data.status != 200){
          this.$message({
            type: 'info',
            message: res.data.message
          });
          this.getAllGoods()
          this.clearGoodsDeal()
        }
      }).catch((res) => {
        console.log(res.data.message)
      })
    },
    getGoods(uuid){
      getGoods(uuid).then((res) => {
        this.goodsDeal.uuid = res.data.data.uuid
        this.goodsDeal.goodsName = res.data.data.goodsName
        this.goodsDeal.goodsType = res.data.data.goodsType
        this.goodsDeal.recycleDetail = res.data.data.recycleDetail
        this.goodsDeal.perMoney = res.data.data.perMoney
        this.goodsDeal.unit = res.data.data.unit
        this.goodsDeal.remark = res.data.data.remark
        this.goodsDeal.pic = res.data.data.pic
        console.log(this.goodsDeal)
      }).catch((res) => {
        console.log(res.data.message)
      })
    },
    delGoods(uuid) {
      this.$confirm('此操作将永久删除该物品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delGoods(uuid).then((res) => {
          this.getAllGoods()
        }).catch((res) => {
          console.log(res.data.message)
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    clearGoodsDeal(){
      this.goodsDeal.uuid = '',
        this.goodsDeal.goodsType = '',
        this.goodsDeal.goodsName = '',
        this.goodsDeal.pic = '',
        this.goodsDeal.recycleDetail = '',
        this.goodsDeal.perMoney = null,
        this.goodsDeal.remark = ''
    }
  }
}
</script>

<style scoped lang="stylus">
.app-container
  padding 20px
</style>


