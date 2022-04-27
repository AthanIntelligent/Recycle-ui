<template>
  <div class="app-container">
    <el-button @click="dialogVisible = true" type="primary" size="medium">添加</el-button>
    <el-table :key="key" :data="goodsTypeList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              highlight-current-row style="width: 100%;font-size: 16px">
      <el-table-column type="index" width="150" label="序号">
      </el-table-column>
      <el-table-column
        prop="goodsType"
        label="物品类型"
        width="900"
      >
      </el-table-column>
      <el-table-column
        prop="uuid"
        fixed="right"
        label="操作"
        width="400">
        <template slot-scope="scope">
          <el-button
            @click="delGoodsType(scope.row.uuid)"
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
    :total="goodsTypeList.length">
    </el-pagination>

    <!--物品类型添加-->
    <el-dialog
      :title="'添加物品类型'"
      :visible.sync="dialogVisible"
      width="30%">
      <goodsTypeDialogBar v-bind:goodsType="goodsType"></goodsTypeDialogBar>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false,addGoodsType(goodsType)"
                   v-if="goodsType.uuid == ''">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import goodsTypeDialogBar from './goodsTypeDialogBar'
import {dirGoodsType, addGoodsType, delGoodsType} from '@/api/goodstype'

export default {
  name: 'TypeTable',
  components: {
    goodsTypeDialogBar
  },
  data() {
    return {
      goodsType: {
        uuid: '',
        goodsType: ''
      },
      currentPage: 1,
      pagesize: 10,
      goodsTypeList: [],
      dialogVisible: false,
      key: 1 // table key
    }
  },
  created() {
    this.getAllList()
  },
  methods: {
    handleSizeChange: function (size) {
      this.pagesize = size
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
    },
    getAllList() {
      dirGoodsType().then((res) => {
        if (res.data.status === 200) {
          this.goodsTypeList = res.data.data
        }
      }).catch((res) => {
        console.log(res.message)
      })
    },
    addGoodsType(data) {
      addGoodsType(data).then((res) => {
        if (res.data.status == 200){
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.getAllList()
          this.goodsType.goodsType = null
        }
        if (res.data.status != 200){
          this.$message({
            type: 'info',
            message: res.data.message
          });
        }
      }).catch((res) => {
      })
    },
    delGoodsType(uuid) {
        this.$confirm('此操作将永久删除该物品类型, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delGoodsType(uuid).then((res) => {
            this.getAllList()
          }).catch((res) => {
            console.log(res.message)
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
    }
  }
}
</script>

<style scoped lang="stylus">
.app-container
  padding 20px
</style>
