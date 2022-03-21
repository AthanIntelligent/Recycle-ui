<template>
  <div class="app-container">
    <el-form :inline="true" :model="station" class="demo-form-inline">
      <el-form-item label="基站名称">
        <el-input v-model="station.stationName" placeholder="基站名称"></el-input>
      </el-form-item>
      <el-form-item label="基站地址">
        <el-input v-model="station.address" placeholder="基站地址"></el-input>
      </el-form-item>
      <!--审核状态-->
      <el-form-item label="审核状态">
        <el-select v-model="station.check" placeholder="审核状态">
          <el-option label="已审核" value="shanghai"></el-option>
          <el-option label="未审核" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <!--开启状态-->
      <el-form-item label="开启状态">
        <el-select v-model="station.openFlag" placeholder="开启状态">
          <el-option label="开启" value="shanghai"></el-option>
          <el-option label="关闭" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 列表数据 stationList -->
    <el-table :data="stationList" border fit highlight-current-row style="width: 100%">
      <el-table-column
        fixed="left"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            @click="dialogVisible = true"
            type="text"
            size="small">
            修改状态
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="stationName"
        label="基站名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="legal"
        label="基站法人"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="基站地址">
      </el-table-column>
      <el-table-column
        prop="pic"
        label="基站图片">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <!--审核-->
      <el-table-column
        prop="check"
        label="审核状态">
        <el-button type="success" v-if="check = 1" disabled>已审核</el-button>
        <el-button type="info" v-else>未审核</el-button>
      </el-table-column>
      <el-table-column
        prop="openFlag"
        label="开启状态">
        <!--true 开启；false 失败-->
        <el-button type="success" v-if="openFlag = true">开启</el-button>
        <el-button type="info" v-else>关闭</el-button>
      </el-table-column>
    </el-table>

    <!--添加基站信息 修改状态（可以关闭状态）-->
<!--    <el-dialog
      :title="station.uuid == ''?'添加基站信息':'修改基站状态'"
      :visible.sync="dialogVisible"
      width="30%">
      <station-dialog-bar v-bind:station="station"></station-dialog-bar>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false,addStation()"
                   v-if="station.uuid == ''">确 定</el-button>
        <el-button type="primary" @click="dialogVisible = false,changeStationFlag()" v-else>确 定</el-button>
      </span>
    </el-dialog>-->
  </div>
</template>

<script>
import axios from 'axios'
import stationDialogBar from './stationDialogBar'

export default {
  name: 'StationMessages',
  components: {stationDialogBar},
  data() {
    return {
      dialogVisible: false,
      station: {
        uuid: '',
        stationName: '1',
        legal: '2',
        address: '3',
        pic: '',
        createTime: '2022-03-16',
        openFlag: true,
        check: 1
      },
      stationList: [
        {
          uuid: '001',
          stationName: '111',
          legal: '222',
          address: '333',
          pic: '',
          createTime: '2022-03-17',
          openFlag: true,
          check: 1
        }, {
          uuid: '002',
          stationName: '1',
          legal: '2',
          address: '3',
          pic: '',
          createTime: '2022-03-18',
          openFlag: false,
          check: 1
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      alert(123)
    },
    addStation() {
    },
    changeStationFlag() {
    }
    // getAllStations() {
    //   axios({
    //     url: 'http://localhost:8080/goods/dirStations',
    //     method: 'get'
    //   }).then(res => {
    //     this.stationList = res.data
    //   })
    // }
  },
  created() {
    // this.getAllStations()
  }
}
</script>

<style scoped>

</style>
