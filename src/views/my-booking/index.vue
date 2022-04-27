<template>
  <div class="container">
    <div class="queryDiv">
      <el-input placeholder="请输入基站地址" v-model="stationName" style="width: 180px"></el-input>
      <el-date-picker
        v-model="date"
        align="right"
        type="date"
        placeholder="预约的时间">
      </el-date-picker>
      <el-button type="primary">查询</el-button>
    </div>
    <div class="bookingDiv">
      <div class="station-name">垃圾回收基站1</div>
      <div class="station-address"><b>基站地址:</b>北京市海淀区苏家屯镇柳林村</div>
      <div class="station-address"><b>预约的时间:</b>2022-5-30 20:00:00</div>
      <div class="station-address"><b>预约回收的废品:</b>衣服（￥1.2元/kg）、纸盒（￥0.5元/kg）</div>
      <div class="cancel-booking"><el-button  type="primary" plain>取消预约</el-button></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      stationName:'',
      date:''
    }
  },
  methods:{

  }
}
</script>

<style scoped>
.container{
  width: 100%;
  height: auto;
  background-color: white;
  padding:20px;

}
.queryDiv{
  width: 100%;
  height: 65px;
}
.bookingDiv{
  width: 460px;
  height: 255px;
  /*background-color: gainsboro;*/
  background-color: #eee;
  border: 1px solid #ccc;
  padding: 10px;
  position: relative;
}
.bookingDiv div{
  margin-bottom: 10px;
}
span{

}
.station-name{
  font-size: 24px;
  font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  font-weight: bold;
  color: #00b4aa;
}
.station-address{
  font-size: 20px;
}
.cancel-booking{
  position: absolute;
  right: 5px;
  bottom: 2px;
}
</style>
