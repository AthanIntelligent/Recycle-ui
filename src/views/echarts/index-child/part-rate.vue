<template>
  <div style="height: 400px">
    <div id="myChart" style="width: 100%;height: 100%"></div>
  </div>
</template>
<script>
export default {
  name: 'part-rate',
  props: {
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    xData: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    },
    yData: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      optionData: [],
    }
  },
  methods: {
    initChart() {
      var chartDom = document.getElementById('myChart');
      var myChart = this.$echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: '废品名称',
            textStyle: {
              color: '#999'
            }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          textStyle: {
            fontSize: 12,//字体大小
            color: '#fff'//字体颜色
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0,1],
          axisLabel: {
            show: true,
            textStyle: {
              color: '#ffffff'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: this.yData,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#ffffff'
            }
          }
        },
        color:['#62d1de','#54d6b6','#a6db69','#ffd454','#ffa361','#d1d1d1'],
        series: [
          {
            name: new Date().getFullYear(),
            type: 'bar',
            data: this.xData
          }
        ]
      };

      myChart.setOption(option);
    }
  },
  created() {
  },
  mounted() {
    setTimeout(()=>{
      this.initChart();
    },1500)
  }
}
</script>
