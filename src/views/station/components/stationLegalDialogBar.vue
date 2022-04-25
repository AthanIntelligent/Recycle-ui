<template>
  <el-descriptions class="margin-top" title="基站法人信息" :column="1" size="medium " border>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        用户名
      </template>
      <el-table-column >
        <span>{{userRight.realName}}</span>
      </el-table-column>
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-location-outline"></i>
        身份证号
      </template>
      <span>{{userRight.id}}</span>
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-mobile-phone"></i>
        手机号
      </template>
      <span>{{userRight.mobile}}</span>
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-mobile-phone"></i>
        年龄
      </template>
      <span>{{userRight.age}}</span>
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-mobile-phone"></i>
        性别
      </template>
      <span>{{userRight.sex}}</span>
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-tickets"></i>
        注册时间
      </template>
      <el-tag size="small"><span>{{userRight.createTime}}</span></el-tag>
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-office-building"></i>
        联系地址
      </template>
      <span>{{userRight.address}}</span>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
export default {
  name: "stationLegalDialogBar",
  props: {
    userRight: {
      realName : null,
      id : null,
      sex: null,
      age : null,
      mobile : null,
      address : null,
      createTime : null
    }
  },
  data () {
    return {

    }
  },
  mounted() {
    // alert(123)
    console.log(this.userRight,123)
  }
}
</script>

<style scoped>

</style>
