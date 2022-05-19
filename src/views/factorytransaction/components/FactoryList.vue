<template>
  <div class="app-container">
    <el-form :inline="true" :model="manufacturers" class="demo-form-inline">
      <el-form-item label="厂商名称">
        <el-input v-model="manufacturers.factureName" placeholder="厂商名称"></el-input>
      </el-form-item>
      <el-form-item label="物品名称">
        <el-input v-model="manufacturers.recycleGoodsAndPrice" placeholder="物品名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">查询</el-button>
        <el-button type="primary" @click="clearTwo()">清空</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="loading"
      element-loading-text="玩命加载中"
      element-loading-spinner="el-icon-loading"
      :data="manufacturerList"
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
            @click="toTrade(scope.row)" type="text"
            size="middle">
            开始交易
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
      :total="manufacturerList.length">
    </el-pagination>
  </div>
</template>

<script>
import {dirManufacture} from '@/api/manufacture'
export default {
  name: 'FactoryList',
  data() {
    return {
      manufacturers: {
        factureName: null,
        recycleGoodsAndPrice: null
      },
      manufacturerList: [],
      currentPage: 1,
      pagesize: 10,
      loading: true,
      dialogVisible: false
    }
  },
  created() {
    this.getManufactureList()
  },
  methods: {
    getManufactureList() {
      dirManufacture(this.manufacturers).then((res) => {
        if (res.data.status === 200) {
          this.manufacturerList = res.data.data
          this.loading = false
        }
      }).catch((res) => {
        console.log(res.data.message)
      })
    },
    onSubmit() {
      this.getManufactureList()
    },
    clearTwo() {
      this.manufacturers.factureName = null
      this.manufacturers.recycleGoodsAndPrice = null
    },
    toTrade(row) {

    },
    handleSizeChange: function (size) {
      this.pagesize = size
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    }
  }
}
</script>

<style scoped>

</style>
