<template>
  <div class="app-container">
    <el-steps :active="active" finish-status="success">
      <el-step title="注册基站"></el-step>
      <el-step title="绑定支付方式"></el-step>
      <el-step title="基站状态"></el-step>
    </el-steps>

    <div class="threeAllClass" v-show="vis1">
      <one @flagOne="getFlagOne" />
    </div>
    <div class="threeAllClass" v-show="vis2">
      <two :flagTow="two" />
    </div>
    <div class="threeAllClass" v-show="vis3">
      <three :flagThree="three" />
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
      active: 0,
      vis1:true,
      vis2:false,
      vis3:false,
      one:false,
      two:true,
      three:true
    };
  },
  methods: {
    getFlagOne(v){
      this.one = v;
    },
    next() {
      if (++this.active > 2){
        alert("入驻基站完成，请等待管理员审核！");
        return;
      } else if(this.active == 1){
        if(!this.one){
          this.active = 0;
          this.vis1 =true;
          this.vis2 = false;
          this.vis3 = false;
          alert('请先完善基站资料！');
        }else {
          this.vis2 = true;
          this.vis1 = false;
          this.vis3 = false;
        }
      }else if(this.active == 2){
        this.vis3 = true
        this.vis2 = false;
        this.vis1 = false;
      }
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
