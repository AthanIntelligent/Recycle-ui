<template>
  <div class="app-container">
    <el-form :inline="true" :model="user" class="demo-form-inline">
      <el-form-item label="真实姓名">
        <el-input v-model="user.realName" placeholder="真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="家庭住址">
        <el-input v-model="user.address" placeholder="家庭住址"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(user)">查询</el-button>
        <el-button type="primary" @click="clearTwo()">清空</el-button>
      </el-form-item>
    </el-form>
    <el-table :key="key" :data="stationUserList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              highlight-current-row style="width: 100%;font-size: 16px">
      <el-table-column type="index" width="100" label="序号">
      </el-table-column>
      <el-table-column
        prop="loginName"
        label="登录名"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="realName"
        label="真实姓名"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="家庭住址"
        width="250"
      >
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="id"
        label="身份证号码"
        width="230"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="注册时间"
        width="230"
      >
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
      :total="stationUserList.length">
    </el-pagination>
  </div>
</template>

<script>
import {dirUserInfo} from "@/api/userA";

export default {
  name: "CommonUserTable",
  data() {
    return {
      user: {
        loginName: null,
        realName: null,
        address: null,
        userType: '1',
        openFlag: null

      },
      currentPage: 1,
      pagesize: 10,
      stationUserList: [],
      dialogVisible: false,
      key: 1 // table key
    }
  },
  created() {
    this.getStationUserList()
  },
  methods: {
    handleSizeChange: function (size) {
      this.pagesize = size
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
    },
    getStationUserList() {
      dirUserInfo(this.user).then((res) => {
        if (res.data.status === 200) {
          this.stationUserList = res.data.data
          this.change(this.stationUserList);
        }
      }).catch((res) => {
        console.log(res.data.message)
      })
    },
    onSubmit(user) {
      dirUserInfo(user).then((res) => {
        if (res.data.status === 200) {
          this.stationUserList = res.data.data
        }
      }).catch((res) => {
        console.log(res.data.message)
      })
    },
    clearTwo() {
      this.user.realName = null
      this.user.address = null
    },
    change() {
      for (let a of this.stationUserList) {
        if (a.sex == '1') {
          a.sex = '男'
        }
        if (a.sex == '2') {
          a.sex = '女'
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
