<template>
  <div :style="{ height: windowHeight+ 'px',width:windowWidth + 'px' }">
    <div id="container" v-loading="loading"></div>
  </div>
</template>

<script>
import {positionData} from "./positionData";

export default {
  name: "index",
  data() {
    return {
      windowWidth: document.documentElement.clientWidth,  //实时屏幕宽度
      windowHeight: document.documentElement.clientHeight,   //实时屏幕高度
      mapIcon:'../../static/image/map.png',
      currLng:null,
      currLat:null,
      loading:true
    }
  },
  methods:{
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
              zoom: 20, //级别
              center: [that.currLng, that.currLat], //中心点坐标
              viewMode: "3D", //使用3D视图
            });
            console.log(that.currLng+","+that.currLat)
            that.setMarkers(map);
            that.loading=false
          }else {
            window.location.reload();
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

      for(var i=0;i<positionData.length;i++){
        // 创建一个 Marker 实例：
        var marker = new AMap.Marker({
          position: positionData[i].lnglat, // 地理位置经纬度
          title: positionData[i].title, // 鼠标移上去时显示的内容
          offset: new AMap.Pixel(-70, -50),
          icon:that.mapIcon,
          extData: positionData[i].id
        });
        clickHandler = function(e) {
          // console.log(e.target.w,111)
          // console.log(marker)
          myMap.getCenter().lng=e.lnglat.lng;
          myMap.getCenter().Q=e.lnglat.lat;
          myMap.getCenter().R=e.lnglat.lng;
          myMap.getCenter().lat=e.lnglat.lat;
          // console.log(myMap.getCenter())
          that.setInfoWindow(myMap,e.target.w.extData)
        };
        // marker.on('mousemove', clickHandler);
        marker.on('click', clickHandler);
        markers.push(marker)
      }

      myMap.add(markers)
    },
    setInfoWindow(myMap,data){
      var that = this;
      //信息窗体的标题
      var title = '<span >基站名称'+data+'</span>';
      // // 信息窗体的内容
      var content = [];
      // content.push("<div class='input-card content-window-card'><div><img style=\"float:left;\" src=\" https://webapi.amap.com/images/autonavi.png \"/></div> ");
      // content.push("<div  style=\"width: 400px;height: 600px;position: relative;background-color: #888888\"><h2 style=\"color:lightblue\">基站名称"+data+"</h2>");
      content.push("<div style=\"width: 98%;height: 93%;position: absolute;top: 22px;padding-left: 5px\">");
      content.push("<p class='input-item'>电话 : <span style='color: grey'>010-84107000</span>   邮编 : <span style='color: grey'>100102</span></p>");
      content.push("<p class='input-item'>地址 :<span style='color: grey'>北京市朝阳区望京阜荣街10号首开广场4层</span></p>");
      content.push("<div style=\"display: flex;align-items: center\">可回收物品:<span class=\"spanStyle\" style=\"margin-left: 10px;color: grey\">纸盒、衣服、烟头、头发、酒瓶</span></div>")
      content.push("<p class='input-item'>营业时间:<span style=\"color: grey\">"+new Date()+"</span></p>")
      content.push("<div style=\"display: flex;justify-content: right;\"><button type='button' style=\"margin-right: 10px\">💭咨询</button><button type='button'>＋追加</button></div>")
      content.push("<p class='input-item' style=\"position: absolute;bottom: 5px;left: 5px;font-size: 15px;color: grey\">距离你直线距离：xxxkm</p></div>")

      var infoWindow = new AMap.InfoWindow({
        // content: content.join("<br>")  //传入 dom 对象，或者 html 字符串
        isCustom: true,  //使用自定义窗体
        content: that.createInfoWindow(title, content.join("<br/>"),myMap),
        // offset: new AMap.Pixel(16, -45)
      });
//鼠标点击marker弹出自定义的信息窗体
//       AMap.event.addListener(marker, 'click', function () {
//         infoWindow.open(myMap, marker.getPosition());
//       });
      infoWindow.open(myMap, myMap.getCenter());
      // this.info = infoWindow
    },
    //构建自定义信息窗体
    createInfoWindow(title, content,myMap) {
      var that = this;
      var info = document.createElement("div");
      info.className = "custom-info input-card content-window-card";
      info.style.position = 'relative';
      info.style.boxShadow = 'none';
      info.style.bottom = '0';
      info.style.left = '0';
      // info.style.width = 'auto';
      info.style.padding = '0';
      //可以通过下面的方式修改自定义窗体的宽高
      info.style.width = "400px";
      info.style.height = "320px";
      info.style.backgroundColor = "white"
      // 定义顶部标题
      var top = document.createElement("div");
      var titleD = document.createElement("div");
      var closeX = document.createElement("img");
      top.className = "info-top";
      top.style.position = 'relative';
      top.style.background = 'white';
      top.style.borderBottom = '1px solid #CCC';
      top.style.borderRadius = '5px 5px 0 0';
      titleD.style.display = 'inline-block';
      titleD.style.color = '#0099FF';
      titleD.style.fontSize = '19px';
      titleD.style.fontWeight = 'bold';
      titleD.style.lineHeight = '31px';
      titleD.style.padding = '0 10px';
      closeX.style.position = 'absolute';
      closeX.style.top = '10px';
      closeX.style.right = '10px';
      closeX.style.transitionDuration = '0.25s'
      // closeX:setHoverStyle.style.boxShadow = '0px 0px 5px #000'
      titleD.innerHTML = title;
      closeX.src = "https://webapi.amap.com/images/close2.gif";
      closeX.style.zIndex = '100'
      closeX.onclick = function (){
        myMap.clearInfoWindow()
      }

      top.appendChild(titleD);
      top.appendChild(closeX);
      info.appendChild(top);

      // 定义中部内容
      var middle = document.createElement("div");
      middle.className = "info-middle";
      middle.style.color = 'black'
      middle.style.backgroundColor = 'gray';
      middle.style.fontSize = '17px';
      middle.style.height = 'auto'
      middle.innerHTML = content;
      info.appendChild(middle);

      // 定义底部内容
      var bottom = document.createElement("div");
      bottom.style.position = 'absolute';
      bottom.style.bottom = '0px';
      bottom.style.margin = '0 auto';
      bottom.style.height = '0px';
      bottom.style.width = '100%';
      bottom.style.clear = 'both';
      bottom.style.textAlign = 'center';
      var sharp = document.createElement("img");
      sharp.src = "https://webapi.amap.com/images/sharp.png";
      sharp.style.position = 'relative';
      sharp.style.zIndex = '104';
      bottom.appendChild(sharp);
      info.appendChild(bottom);
      return info;
    },



},
  mounted() {
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
