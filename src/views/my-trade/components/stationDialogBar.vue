<template>
  <el-form :model="stationRight"  ref="goodsType" label-width="100px" class="demo-ruleForm">
    <el-form-item label="基站名称">
      <el-input type="text" v-model="stationRight.stationName" readonly/>
    </el-form-item>
    <el-form-item label="基站地址">
      <el-input type="text" v-model="stationRight.stationAddress" readonly></el-input>
    </el-form-item>
    <el-form-item label="开启状态">
      <el-input type="text" v-model="stationRight.openFlag" readonly></el-input>
    </el-form-item>
    <el-form-item label="创建时间">
      <el-input type="text" v-model="stationRight.createTime" readonly></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "stationDialogBar",
  props: {
    stationRight: {
      uuid: null,
      stationName: null,
      stationLegal: null,
      stationAddress: null,
      openFlag: null,
      createTime: null
    }
  }
}
</script>

<style scoped>

</style>
