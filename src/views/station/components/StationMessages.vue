<template>
  <div class="app-container">
    <el-form :inline="true" :model="station" class="demo-form-inline">
      <el-form-item label="基站名称">
        <el-input v-model="station.stationName" placeholder="基站名称"></el-input>
      </el-form-item>
      <el-form-item label="基站地址">
        <el-input v-model="station.address" placeholder="基站地址"></el-input>
      </el-form-item>
      <!--开启状态-->
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
    <el-table :data="stationList.slice((currentPage-1)*pagesize,currentPage*pagesize)" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" width="100" label="序号">
      </el-table-column>
      <el-table-column
        prop="legal"
        label="基站法人"
        width="180">
        <template slot-scope="scope">
          <el-button
            @click="drawer = true, getStationLegal(scope.row.uuid)" type="text"
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
        prop="openFlag"
        label="开启状态">
<!--        <template slot-scope="scope">-->
<!--          <el-switch-->
<!--            v-model="statusSwitch"-->
<!--            active-color="#13ce66"-->
<!--            inactive-color="#ff4949"-->
<!--            @click="changeStatus(scope.row.openFlag)"-->
<!--          >-->
<!--          </el-switch>-->
<!--        </template>-->
      </el-table-column>
    </el-table>

    <el-drawer
      title="基站法人详细信息"
      :visible.sync="drawer"
      :with-header="false">
      <station-legal-dialog-bar />
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
import {dirStation , getStationLegal} from '@/api/station'
import StationLegalDialogBar from "./stationLegalDialogBar";

export default {
  name: 'StationMessages',
  components: {StationLegalDialogBar, stationDialogBar},
  props: {
    user: {
      realName : '',
      id : '',
      sex: '',
      age : null,
      mobile : '',
      address : '',
      createTime : ''
    }
  },
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
      statusSwitch: fasle
    }
  },
  created() {
    this.getAllStations()
  },
  methods: {
    handleSizeChange: function (size) {
      this.pagesize = size
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
    },
    getAllStations() {
      dirStation(this.station).then((res) => {
        if (res.data.status === 200) {
          this.stationList = res.data.data
          // for (let sta of this.stationList){
          //   sta.openFlag == "1"?sta.openFlag = "开启":sta.openFlag = "关闭"
          // }
        }
      }).catch((res) => {
        console.log(res.data.message)
      })
    },
    onSubmit() {
      this.getAllStations()
    },
    clearThem() {
      this.station.stationName=null;
      this.station.stationAddress=null;
      this.station.openFlag=null;
    },
    getStationLegal(stationUuid) {
      getStationLegal(stationUuid).then((res) => {
        console.log(res.data)
        if (res.data.status === 200) {
          this.user.realName = res.data.data.realName
          this.user.id = res.data.data.id
          this.user.sex = res.data.data.sex
          this.user.age = res.data.data.age
          this.user.mobile = res.data.data.mobile
          this.user.address = res.data.data.address
          this.user.createTime = res.data.data.createTime
          console.log(res.data.realName)
        }
      }).catch((res) => {
        console.log(res.message)
      })
    },
    changeStatus(status) {
      // status=='开启'?this.statusSwitch=true:this.statusSwitch=false

    }
  }
}
</script>

<style scoped>

</style>
