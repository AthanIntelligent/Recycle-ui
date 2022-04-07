<template>
  <div class="app-container">
    <el-button @click="dialogVisible = true">添加</el-button>
    <!-- 列表数据 goodsList -->
    <el-table :key="key" :data="goodsTypeList" border fit highlight-current-row style="width: 100%">
      <el-table-column
        prop="goodsType"
        label="物品类型"
        width="800"
      >
      </el-table-column>
      <el-table-column
        prop="uuid"
        fixed="right"
        label="操作"
        width="400">
        <template slot-scope="scope">
          <el-button
            @click="delGoodsType(this.uuid)"
            type="text"
            size="small">
            删除
          </el-button>
          <!--          <el-button-->
          <!--            @click.native.prevent="deleteRow(scope.$index, tableData)"-->
          <!--            type="text"-->
          <!--            size="small">-->
          <!--            移除-->
          <!--          </el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <!--    分页-->
    <!--    <el-pagination-->
    <!--      background-->
    <!--      layout="prev, pager, next"-->
    <!--      :total="1000">-->
    <!--    </el-pagination>-->

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
      goodsTypeList: [],
      dialogVisible: false,
      key: 1 // table key
    }
  },
  created() {
    this.getAllList()
  },
  methods: {
    // deleteRow(index, rows) {
    //   rows.splice(index, 1)
    // },
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
      }).catch((res) => {
        error(res.data.message)
      })
    },
    delGoodsType(uuid) {
      alert(123)
      alert(uuid)
      delGoodsType(uuid).then((res) => {
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
