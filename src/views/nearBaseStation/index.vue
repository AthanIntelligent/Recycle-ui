<template>
  <div :style="{ height: windowHeight+ 'px',width:windowWidth + 'px' }">
    <div id="container" v-loading="loading"></div>
    <infoWindowComponent ref="infoWindowComponent"></infoWindowComponent>
  </div>
</template>

<script>
import {positionData} from "./positionData";
import goodsType from "./../my-trade/goods-type"
import infoWindowComponent from "./infowindow";
import {dirStation,getStationLegal} from '@/api/station'
import {getGoodsOfStationByStationId} from '@/api/goodsofstation'
const val = true;
export default {
  name: "index",
  components:{
    infoWindowComponent,
    goodsType
  },
  data() {
    return {
      windowWidth: document.documentElement.clientWidth,  //实时屏幕宽度
      windowHeight: document.documentElement.clientHeight,   //实时屏幕高度
      mapIcon:'../../static/image/map.png',
      currLng:null,
      currLat:null,
      loading:true,
      station:{
        openFlag:'开启'
      },
      stationList:[]
    }
  },
  methods:{
    bookingFlag: false,
    getCurrPosition(){
      var that =this;
      AMap.plugin('AMap.Geolocation', function() {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonOffset: new AMap.Pixel(10, 20),
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          showButton: true, //显示定位按钮，默认：true
          showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
          panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
          //  定位按钮的排放位置,  RB表示右下
          buttonPosition: 'RB'
        })

        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', onComplete)
        AMap.event.addListener(geolocation, 'error', onError)

        function onComplete (data) {
          that.currLng = data.position.lng;
          that.currLat = data.position.lat;
          console.log(that.currLng,"lng")
        }

        function onError (data) {
          // 定位出错
          console.log(data,"2")
        }
      })
    },
    init() {
      var that = this;
      var lng = '';
      var lat = '';
      window.onLoad = function () {
        that.getCurrPosition();

        setTimeout(()=>{
          if(that.currLng != null && that.currLat != null){
            var map = new AMap.Map("container", {
              zoom: 13, //级别
              center: [that.currLng, that.currLat], //中心点坐标
              viewMode: "3D", //使用3D视图
            });
            console.log(that.currLng+","+that.currLat)
            that.setMarkers(map);
            that.loading=false
          }else {
            that.init();
          }

        },1500)
      };
      // key是申请的值
      var url = "https://webapi.amap.com/maps?v=1.4.15&key=36945e2c1ec9fcd3ecd5d953d4169592&callback=onLoad";
      //创建一个 script dom元素
      // doc需要补全document
      var jsapi = document.createElement("script");
      //设定script标签属性
      jsapi.charset = "utf-8";
      jsapi.src = url;
      //将API文件引入页面中,加载完毕以后会调用函数
      document.head.appendChild(jsapi);
    },
    setMarkers(myMap) {
      var that = this;
      var markers =[];
      var clickHandler = [];
      for(var i=0;i<that.stationList.length;i++){
        that.stationList[i]["distance"] = that.getDistance(that.currLng,that.currLat,that.stationList[i].lnglat[0],that.stationList[i].lnglat[1])
      }
      var positionData = JSON.parse(JSON.stringify(that.stationList));
      for(var i=0;i<positionData.length;i++){
        // 创建一个 Marker 实例：
        if(positionData[i].distance!=undefined && positionData[i].distance<50){
          var marker = new AMap.Marker({
            position: positionData[i].lnglat, // 地理位置经纬度
            title: positionData[i].title, // 鼠标移上去时显示的内容
            offset: new AMap.Pixel(-70, -50),
            icon:that.mapIcon,
            extData: {
              stationInfo: positionData[i].stationInfo,
              userInfo: positionData[i].userInfo,
              goodsInfo: positionData[i].goodsInfo,
              distance: positionData[i].distance
            }
          });
          clickHandler = function(e) {
            console.log(e.target,111)
            // console.log(marker)
            myMap.getCenter().lng=e.lnglat.lng;
            myMap.getCenter().Q=e.lnglat.lat;
            myMap.getCenter().R=e.lnglat.lng;
            myMap.getCenter().lat=e.lnglat.lat;
            that.openInfo(myMap,e.target.w.extData,e.target.w.position)
          };
          // marker.on('mousemove', clickHandler);
          marker.on('click', clickHandler);
          markers.push(marker)
        }
      }
      myMap.add(markers)
    },
    openInfo(myMap,extData,target){
      var that = this
      let infoWindow = new AMap.InfoWindow({
        isCustom:true,
        content: that.$refs.infoWindowComponent.$el,
        // offset: new AMap.Pixel(0, -25)
      });
      infoWindow.open(myMap, myMap.getCenter());
      this.infoWindow = infoWindow;
      // 调用组件方法，初始化组件页面的infoWindow等数据
      that.$refs.infoWindowComponent.initialize({
        overlay: target,
        infoWindow: that.infoWindow,
        extData: extData
      });
    },
    // 获取附件的基站信息和位置
    async getStationInfo(){
      var that = this;
      that.stationList = []
      await dirStation(this.station).then(res => {
        var sta = JSON.parse(JSON.stringify(res.data.data))
        for(var i=0;i<sta.length;i++){
          var stationInfo = {
            lnglat: that.getStationLngLat(sta[i].stationAddress),
            title: sta[i].stationName,
            stationInfo: sta[i]
          };
          that.toSetUserInfoAndGoodsInfo(stationInfo,sta[i].stationLegal,sta[i].uuid).then(res=>{
            that.stationList.push(res)
          })
        }

      }).catch(err => {
        alert(err.message)
      })
      console.log(that.stationList,"1234")
    },
    getStationLngLat(address){
      var position = [];
      var xmlhttp;
      if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
      }else{
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      xmlhttp.onreadystatechange=function (){
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
          var data = JSON.parse(xmlhttp.responseText)
          position = data.geocodes[0].location.split(",");
        }
      }
      var getPositionQuire = "http://restapi.amap.com/v3/geocode/geo?key=389880a06e3f893ea46036f030c94700&s=rsv3&city=35&address="+address;
      xmlhttp.open("GET",getPositionQuire,false);
      xmlhttp.send();
      return position;
    },
    async toSetUserInfoAndGoodsInfo(stationInfo,stationLegal,uuid){
      let userInfo = {}
      await getStationLegal(stationLegal).then(res => {
        userInfo = res.data.data;
      }).catch(err => {
        alert(err.message)
      })
      let goodsInfo = []
      await getGoodsOfStationByStationId(uuid).then(res => {
        goodsInfo = res.data.data
      }).catch(err => {
        alert(err.message)
      })
      stationInfo['userInfo'] = JSON.parse(JSON.stringify(userInfo));
      stationInfo['goodsInfo'] = JSON.parse(JSON.stringify(goodsInfo));
      return stationInfo;
    },
    getDistance(longitude1,latitude1, longitude2,  latitude2) {
      console.log(longitude1+","+latitude1+","+longitude2+","+latitude2)
      var radLat1 = latitude1*Math.PI / 180.0;
      var radLat2 = latitude2*Math.PI / 180.0;
      var a = radLat1 - radLat2;
      var  b = longitude1*Math.PI / 180.0 - longitude2*Math.PI / 180.0;
      var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
        Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
      s = s *6378.137 ;// EARTH_RADIUS;
      s = Math.round(s * 10000) / 10000;
      return s;
    }
  },
  mounted() {
    this.getStationInfo();
    this.init();
  }
}
</script>

<style scoped>
#container {
  width: 100%;
  height: 100%;
}
.info-bottom {
  height: 0px;
  width: 100%;
  clear: both;
  text-align: center;
}

.content-window-card {
  position: relative;
  box-shadow: none;
  bottom: 0;
  left: 0;
  width: auto;
  padding: 0;
}

.content-window-card p {
  height: 2rem;
}
.spanStyle{
  display: flex;width: auto;height: 30px;background-color: #00ffff;font-size: 14px;padding:2px 20px 2px 20px;border-radius: 10px;justify-content: center;align-items: center;margin-left: 10px;
}
</style>
