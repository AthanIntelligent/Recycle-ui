<template>
  <div :style="{ height: windowHeight+ 'px',width:windowWidth + 'px' }">
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      windowWidth: document.documentElement.clientWidth,  //实时屏幕宽度
      windowHeight: document.documentElement.clientHeight,   //实时屏幕高度
      myMap:{}
    }
  },
  methods:{
    init() {
      window.onLoad = function () {
        // var map = new AMap.Map("container");
        var map = new AMap.Map("container", {
          zoom: 20, //级别
          center: [113.3245904, 23.1066805], //中心点坐标
          viewMode: "3D", //使用3D视图
        });
        this.myMap=map

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

        this.setMarkers(this.myMap);

    },
    setMarkers(myMap) {
      // 创建一个 Marker 实例：
      var marker = new AMap.Marker({
        //position: new AMap.LngLat(116.39, 39.9), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        position: [113.3245904, 23.1066805], // 地理位置经纬度
        title: "广州塔", // 鼠标移上去时显示的内容
        offset: new AMap.Pixel(-100, -100), // 偏移量
        // 可以指定图标图片地址
        icon: "//vdata.amap.com/icons/b18/1/2.png", // 添加 Icon 图标 URL
        // 可以自定义标记点显示的内容,允许插入html字符串
        content: "<h1>广州塔Content</h1>",
      });
      // 将创建的点标记添加到已有的地图实例：
      myMap.add(marker);
    },
      markerFun(points,label,infoWindows,map) {
        var markers = new BMapGL.Marker(points);
        map.addOverlay(markers);
        markers.setLabel(label);
        markers.addEventListener("click",function (event) {
          console.log("0001");
          map.openInfoWindow(infoWindows,points);//参数：窗口、点  根据点击的点出现对应的窗口
        });
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
</style>
