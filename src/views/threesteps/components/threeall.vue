<template>
  <div class="app-container">
    <el-steps :active="active" finish-status="success">
      <el-step title="注册基站"></el-step>
      <el-step title="绑定支付方式"></el-step>
      <el-step title="基站状态"></el-step>
    </el-steps>

    <div class="threeAllClass">
      <one />
      <two />
      <three />
    </div>
    <el-button style="margin-top: 12px" @click="next">下一步</el-button>
  </div>
</template>

<script>
import One from './one'
import Two from './two'
import Three from './three'
export default {
  name: "threeAll",
  components: {Three, One,Two},
  data() {
    return {
      active: 0
    };
  },
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    }
  }
}
</script>

<style scoped>
.threeAllClass {
  display: flex;
  flex: 3;
  margin-top: 50px;
}
</style>
