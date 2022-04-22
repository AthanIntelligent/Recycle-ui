<template>
  <div :style="{ height: windowHeight+ 'px',width:windowWidth + 'px' }">
    <div id="container"></div>
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
      mapIcon:'../../static/image/map.png'
    }
  },
  methods:{
    init() {
      var that = this;
      window.onLoad = function () {
        // var map = new AMap.Map("container");
        var map = new AMap.Map("container", {
          zoom: 20, //级别
          center: [113.3245904, 23.1066805], //中心点坐标
          viewMode: "3D", //使用3D视图
        });
        that.setMarkers(map);
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
        });
        clickHandler[i] = function(e) {
          // console.log(e.lnglat)
          console.log(marker)
          // alert('您在['+e.lnglat.lat+','+e.lnglat.lng+']的位置点击了地图！');
          // var myM = new AMap.getMap()
          myMap.add(marker)
          that.setInfoWindow(myMap)
        };
        marker.on('mousemove', clickHandler[i]);
        markers.push(marker)
      }

      myMap.add(markers)
    },
    setInfoWindow(myMap){
      // 信息窗体的内容
      var content = [];
      // content.push("<div class='input-card content-window-card'><div><img style=\"float:left;\" src=\" https://webapi.amap.com/images/autonavi.png \"/></div> ");
      content.push("<div class='input-card content-window-card'>基站名称");
      content.push("<div style=\"padding:7px 0px 0px 0px;width: 400px;height: auto;line-height: 2;\">");
      content.push("<p class='input-item'>电话 : 010-84107000   邮编 : 100102</p>");
      content.push("<p class='input-item'>地址 :北京市朝阳区望京阜荣街10号首开广场4层</p>");
      content.push("<p class='input-item'>可回收物品:</p>")
      content.push("<p class='input-item'>营业时间:</p>")
      content.push("<p class=''><a>咨询</a><a>追加</a></p>")
      content.push("<p class='input-item'>距离你直线距离：xxxkm</p></div></div>")
      infoWindow = new AMap.InfoWindow({
        content: content.join("")  //使用默认信息窗体框样式，显示信息内容
      });
      console.log(myMap.getCenter(),111)
      infoWindow.open(myMap, myMap.getCenter());
      // 创建 infoWindow 实例
      var infoWindow = new AMap.InfoWindow({
        content: content.join("<br>")  //传入 dom 对象，或者 html 字符串
      });

      // 打开信息窗体
      infoWindow.open(myMap);
    }


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
.custom-input-card .btn:last-child{
  margin-left: 1rem;
}
.content-window-card{
  position: relative;
  width: 123rem;
  /*height: 235rem;*/
  padding: 0.75rem 0 0 1.25rem;
  box-shadow: none;
  bottom: 0;
  left: 0;
}

.content-window-card p{
  height: 2rem;
}
.input-item{

}
</style>
