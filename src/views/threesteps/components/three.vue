<template>
  <div>
    <div class="checkDiv">
      <div>{{stationInfo.stationName}}</div>
      <div>{{stationInfo.stationAddress}}</div>
      <div>{{stationInfo.createTime}}</div>
      <div style="color: #00b4aa">{{stationInfo.check}}</div>
      <div style="color: #ccc">{{stationInfo.openFlag == 2?"暂未开启":""}}</div>
      <a href="/#/home" v-if="stationInfo.openFlag == 1">进入基站</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "three",
  props:{
    stationInfo:Object
  },
  methods: {

  }
}
</script>

<style scoped>
.checkDiv{
  width: 100%;
  height: 80px;
  border: 1px solid gray;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
