<template>
  <div class="app-container">
    <el-form :inline="true" :model="station" class="demo-form-inline">
      <el-form-item label="基站名称">
        <el-input v-model="station.stationName" placeholder="基站名称"></el-input>
      </el-form-item>
      <el-form-item label="基站地址">
        <el-input v-model="station.stationAddress" placeholder="基站地址"></el-input>
      </el-form-item>
      <el-form-item label="开启状态">
        <el-select v-model="station.openFlag" placeholder="开启状态">
          <el-option label="开启" value="开启"></el-option>
          <el-option label="关闭" value="关闭"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">查询</el-button>
        <el-button type="primary" @click="clearThem()">清空</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="stationList.slice((currentPage-1)*pagesize,currentPage*pagesize)" border fit highlight-current-row
              style="width: 100%">
      <el-table-column type="index" width="100" label="序号">
      </el-table-column>
      <el-table-column
        prop="legal"
        label="基站详情"
        width="180">
        <template slot-scope="scope">
          <el-button
            @click="drawer = true, getStationLegal(scope.row)" type="text"
            size="middle">
            查看详细信息
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="stationName"
        label="基站名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="stationAddress"
        label="基站地址">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="check"
        label="审核状态">
        <template slot-scope="scope">
          <el-button @click="openCheck(scope.row.check,scope.row)" v-if="scope.row.check=='审核中'">待审批</el-button>
          <span v-else>{{ scope.row.check }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="openFlag"
        label="开启状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.openFlag"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="2"
            @change="changeStatus(scope.row.openFlag,scope.row)">
          </el-switch>
        </template>
      </el-table-column>
    </el-table>

    <el-drawer
      title="基站详细"
      :visible.sync="drawer"
      :with-header="false">
      <station-legal-dialog-bar :userRight="user" :goodsTypeAndGoodsListRight="goodsTypeAndGoodsList"></station-legal-dialog-bar>
    </el-drawer>

    <el-pagination
      style="position: absolute;right:660px;bottom:15px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="stationList.length">
    </el-pagination>
  </div>
</template>

<script>
import stationDialogBar from './stationDialogBar'
import {dirStation, getStationLegal, updStation} from '@/api/station'
import {getGoodsOfStationByStationId} from '@/api/goodsofstation'
import StationLegalDialogBar from "./stationLegalDialogBar";

export default {
  name: 'StationMessages',
  components: {StationLegalDialogBar, stationDialogBar},
  data() {
    return {
      station: {
        stationName: null,
        stationAddress: null,
        openFlag: null
      },
      stationList: [],
      drawer: false,
      currentPage: 1,
      pagesize: 10,
      value: [1],
      user: {
        realName: null,
        id: null,
        sex: null,
        age: null,
        mobile: null,
        address: null,
        createTime: null
      },
      goodsTypeAndGoodsList: []
    }
  },
  created() {
    this.getAllStations()
  },
  methods: {
    handleSizeChange: function (size) {
      this.pagesize = size
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    getAllStations() {
      dirStation(this.station).then((res) => {
        if (res.data.status === 200) {
          this.stationList = res.data.data
        }
      }).catch((res) => {
        console.log(res.data.data.message)
      })
    },
    onSubmit() {
      this.getAllStations()
    },
    clearThem() {
      this.station.stationName = null;
      this.station.stationAddress = null;
      this.station.openFlag = null;
    },
    getStationLegal(row) {
      getStationLegal(row.stationLegal).then((res) => {
        if (res.data.status === 200) {
          var res = res.data
          this.user.realName = res.data.realName
          this.user.id = res.data.id
          this.user.sex = res.data.sex
          this.user.age = res.data.age
          this.user.mobile = res.data.mobile
          this.user.address = res.data.address
          this.user.createTime = res.data.createTime
        }
      }).catch((res) => {
        console.log(res.message)
      });
      getGoodsOfStationByStationId(row.uuid).then((res) => {
        if (res.data.status === 200) {
          this.goodsTypeAndGoodsList = res.data.data
          console.log(res.data.data)
        }
      }).catch((res) => {
        console.log(res.data.data.message)
      })
    },
    updStation(station) {
      updStation(station).then((res) => {
        if (res.data.status === 200) {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.getAllStations()
        }
      }).catch((res) => {
        console.log(res.data.data.message)
        this.$message({
          type: 'info',
          message: '操作失败!'
        });
      })
    },
    changeStatus(status, row) {
      if (status == 1) {
        row.openFlag = 1
      }
      if (status == 2) {
        row.openFlag = 2
      }
      this.updStation(row)
    },
    openCheck(check, row) {
      this.$confirm('是否同意该基站的审核申请?', '提示', {
        confirmButtonText: '同意',
        cancelButtonText: '不同意',
        showClose: false,
        type: 'success',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            row.check = "审核失败"
            this.updStation(row)
            done()
          }
        }
      }).then((res) => {
        row.check = "审核成功"
        this.updStation(row)
      });
    }
  }
}
</script>

<style scoped>

</style>
