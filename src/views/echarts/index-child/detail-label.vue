<template>
  <div class="part-brand-wrapper">
    <div class="data-wrapper" id="chartPie">
    </div>
  </div>
</template>
<script>
  export default {
    name: 'part-brand',
    props: {
      labelData: {
        type: Array,
        required: true,
        default: () => {
          return []
        }
      }
    },
    data() {
      return {
        partTop: this.labelData,
        chartPie: '',
        data:[]
      }
    },
    methods: {
      drawGoodsTypePie(){
        var response = this.$props.labelData;
        let getData = []
        // 先进行赋值
        for (let i = 0; i < response.length; i++) {
          let obj = new Object()
          obj.name = response[i].name // 物品名称
          obj.value = response[i].value // 占比率
          getData[i] = obj
        }
        this.data =getData
      },
      drawPieChart() {
        var goodsTypeName = [];
        for(var i=0;i<this.data.length;i++){
          goodsTypeName[i]= this.data[i].name;
        }
        var chartPie = this.$echarts.init(document.getElementById('chartPie'))
        var option;
        option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            left: 'center',
            top: 'bottom',
            data: goodsTypeName,
            textStyle: {
              fontSize: 12,//字体大小
              color: '#fff'//字体颜色
            }
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          series: [
            {
              name: '所占比例',
              type: 'pie',
              radius: [20, 140],
              center: ['50%', '50%'],
              roseType: 'area',
              itemStyle: {
                borderRadius: 5
              },
              data: this.data
            }
          ]
        };
        chartPie.setOption(option);
      },
    },
    mounted() {
      this.drawGoodsTypePie();
      this.drawPieChart();
    }
  }
</script>
<style scoped lang="stylus">
  .part-brand-wrapper
    height 400px
    .data-wrapper
      font-size 0
      color #E7ECF0
      width 100%
      height 100%
      margin 30 auto
      list-style none

</style>
