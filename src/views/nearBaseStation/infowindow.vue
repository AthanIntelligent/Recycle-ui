<template>
  <div class="info-container">
    <div class="top">
      <div class="titleD">
        {{extData.stationInfo.stationName}}
      </div>
      <img class="closeX" @click="infoWindow.close()" src="https://webapi.amap.com/images/close2.gif">
    </div>
    <div class="middle">
      <div class="mid-div" style="width: 98%;height: 93%;position: absolute;top: 45px;padding-left: 5px">
        <p class='input-item'>电话 : <span style='color: grey'>{{ extData.userInfo.mobile }}</span>  联系人 : <span style='color: grey'>{{ extData.userInfo.realName }}</span></p>
        <p class='input-item'>地址 :<span style='color: grey'>{{extData.stationInfo.stationAddress}}</span>
        <div style="display: flex;"><span style="display: flex;width: 120px">可回收物品:</span><div style="margin-left: 0px;color: grey;line-height: 1.4;"><span v-for="(goodsType,i) in extData.goodsInfo">{{i==extData.goodsInfo.length-1?goodsType.goodsType:goodsType.goodsType+"、"}}</span>&nbsp;<a href='javascript:void(0)' @click="isShowDetail" style="color: #1d7ac2">详情</a></div></div>
        <p class='input-item'>营业状态:<span style="color: grey">{{new Date().getHours()>18 || new Date().getHours()<8?'休息中':'正在营业'}}</span></p>
        <div style="display: flex;justify-content: right;position: absolute;right: 10px;margin-top: 15px"><button type='button' style="margin-right: 10px">💭咨询</button><button type='button' style="margin-right: 10px">＋追加</button><button >🕓预约</button></div>
        <p class='input-item' style="position: absolute;bottom: 5px;left: 5px;font-size: 15px;color: grey">距离你直线距离：{{extData.distance}}km</p>
      </div>
    </div>
    <div class="bottom">
      <img class="sharp" src="https://webapi.amap.com/images/sharp.png">
    </div>
  </div>
</template>

<script>
export default {
  name: "infowindow",
  data(){
    return{
      overlay:'',
      infoWindow:'',
      extData:{}
    }
  },
  methods:{
    initialize(e) {
      this.overlay = e.overlay;
      this.infoWindow = e.infoWindow;
      this.extData = e.extData
      console.log(this.extData)
    },
    isShowDetail(){

    }
  }
}
</script>

<style scoped>
.info-container{
  position: relative;
  box-shadow: none;
  bottom: 0;
  left: 0;
  padding: 0;
  width: 400px;
  height: 310px;
  background-color: white;
}
.top{
  position: relative;
  background: white;
  border-bottom: 1px solid #CCC;
  border-radius: 5px 5px 0 0;
}
.titleD{
  display: inline-block;
  color: #0099FF;
  font-size: 19px;
  font-weight: bold;
  line-height: 31px;
  padding: 0 10px;
}
.closeX{
  position: absolute;
  top: 10px;
  right: 10px;
  transition-duration: 0.25s;
  z-index: 100;
}
.middle{
  position: relative;
  color:black;
  background-color: gray;
  font-size: 17px;
  height: auto;
}
.bottom{
  position: absolute;
  bottom: 0px;
  margin: 0 auto;
  height: 0px;
  width: 100%;
  clear: both;
  text-align: center;

}
.mid-div p{
  margin-bottom: 10px;
}
.mid-div div{
  margin-bottom: 10px;
}
.sharp{
  position: relative;
  z-index: 104;
}
</style>
