<template>
  <div class="app-container">
    <el-steps :active="active" finish-status="success" align-center="true" style="margin-top: 40px">
      <el-step title="注册基站"></el-step>
      <el-step title="绑定支付方式"></el-step>
      <el-step title="基站状态"></el-step>
    </el-steps>

    <div class="oneClass" v-show="vis1">
      <one @flagOne="getFlagOne" />
    </div>
    <div class="twoClass" v-show="vis2">
      <two :flagTow="two" />
    </div>
    <!--todo：注册基站完成后返回基站id，从one组件向父组件传过来；走到第三步的时候去根据这个基站id获取基站状态；显示对应的问题 -->
    <!--todo：在管理员审核都通过的情况下，用户登录可以直接看到相应菜单 或者 看到的还是状态页面显示“审核通过” 提示重新登录；没通过基站用户下次登录的时候看到的还是这个状态的页面-->
    <div class="threeClass" v-show="vis3">
      <three :flagThree="three" />
    </div>
    <el-button class="nextClass" @click="next">下一步</el-button>
  </div>
</template>

<script>
import {getStationDetail} from '@/api/station'
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
      three:true,
      stationId: null
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
.nextClass {
  position: absolute;
  left: 55%;
  top: 90%;
}
.oneClass {
  width: 600px;
  position: absolute;
  left: 40%;
  top: 30%;
}
.twoClass {
  width: auto;
  position: absolute;
  left: 50%;
  top: 30%;
}
.threeClass {
  width: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: 25px;
  color: #00b4aa;
}
</style>
