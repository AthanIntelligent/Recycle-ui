<template>
  <div class="homepage-container">
    <el-row class="home-total">
      <ve-histogram :data="chartData" :extend="extend" :legend-visible="false"
                    style="width: 100%;height: 150px"></ve-histogram>
    </el-row>

    <div style="margin-left: 3px;margin-right: 3px;margin-top: 10px;">
      <div id="chartPie" style="width:50%; height:550px; float: left"></div>
      <div id="chartRose" style="width:50%; height:550px; float: right"></div>
    </div>
  </div>
</template>
<script>
import {dirUandSTransaction, dirGoodsPercent, dirReservationPercent} from '@/api/userandstationtransaction'

export default {
  data() {
    return {
      monthPayList: [],
      homeDetailItem: [],
      rankList: [],
      numAnim: null,
      chartPie: '',
      chartRose: '',
      typeName: [], // 帖子类型名称
      typeNum: [], // 帖子类型数量
      extend: {
        title: {
          text: '当月每日支出统计(柱状图)',
          x: 'center'
        },
        // x轴的文字倾斜
        "xAxis.0.axisLabel.rotate": 45,
        yAxis: {
          type: "value",
          // 是否显示y轴线条
          axisLine: {
            show: true
          },
          // 纵坐标网格线设置，同理横坐标
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          },
          // 线条位置
          position: "left",
          axisLabel: {
            formatter: '{value} 元'
          }
        },
        xAxis: {
          type: 'category',
          axisLine: {
            show: true
          }
        },
        series: {
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          },
          barWidth: '20%',
          itemStyle: {
            normal: {
              color: function (params) {
                let colorList = [
                  '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83',
                  '#0AAF9F', '#E89589', '#16A085', '#4A235A', '#ca8622',
                  '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                  '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0',
                  '#B5C334', '#FCCE10', '#E87C25', '#27727B'
                ]
                return colorList[params.dataIndex]
              },
              // 以下为是否显示，显示位置和显示格式的设置了
              label: {
                show: true,
                position: 'top',
                formatter: '{c} 元'
              }
            }
          }
        },
        dataZoom: [
          {
            type: 'inside',
            show: true,
            xAxisIndex: [0],
            startValue: 0,
            endValue: 4,
            zoomLock: false,//阻止区域缩放
          }
        ],
        grid: {
          show: true,
          // backgroundColor: "#FFF6F3",
          borderColor: "#FFF6F3",
          // containLabel:false,
        }
      },
      chartData: {
        columns: ['day', 'money'],
        rows: []
      },
    }
  },
  methods: {
    getAllMonthPay() {
      dirUandSTransaction().then((res) => {
        if (res.data.status === 200) {
          this.chartData.rows = res.data.data
        }
      }).catch((res) => {
        console.log(res.message)
      })
    },
    drawCharts() {
      this.drawPieChart()
    },
    getTransactionGoodsPercent() {
      dirGoodsPercent().then((response) => {
        if (response.data.status === 200) {
          let getData = []
          // 先进行赋值
          for (let i = 0; i < response.data.data.length; i++) {
            let obj = new Object()
            obj.name = response.data.data[i].name // 物品名称
            obj.value = response.data.data[i].value // 占比率
            getData[i] = obj
          }
          this.chartPie.setOption({
            legend: {
              data: response.data.data.name
            },
            series: [{
              data: getData
            }]
          })
        }
      }).catch((res) => {
        console.log(res.message)
      })
    },
    drawPieChart() {
      this.chartPie = this.$echarts.init(document.getElementById('chartPie'))
      this.chartPie.setOption({
        // 设置标题,副标题,以及标题位置居中
        title: {
          text: '物品占比统计(饼状图)',
          // subtext: '纯属虚构',
          x: 'center'
        },
        // 具体点击某一项触发的样式内容
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {d}%'
        },
        // 左上侧分类条形符
        legend: {
          orient: 'vertical',
          left: 'left',
          data: []
        },

        // 饼状图类型以及数据源
        series: [{
          name: '统计数量',
          type: 'pie',
          radius: '80%',
          data: [],
          // 设置饼状图扇形区域的样式
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      })
    },
    getReservationPercent() {
      dirReservationPercent().then((response) => {
        if (response.data.status === 200) {
          let getData = []
          // 先进行赋值
          for (let i = 0; i < response.data.data.length; i++) {
            let obj = new Object()
            obj.name = response.data.data[i].name // 到访状态
            obj.value = response.data.data[i].value // 占比率
            getData[i] = obj
          }
          this.chartRose.setOption({
            legend: {
              data: response.data.data.name
            },
            series: [{
              data: getData
            }]
          })
        }
      }).catch((res) => {
        console.log(res.message)
      })
    },
    drawRoseCharts() {
      this.chartRose = this.$echarts.init(document.getElementById('chartRose'))
      let colorArr = ['#218de0', '#01cbb3', '#85e647', '#5d5cda', '#05c5b0', '#c29927']
      let colorAlpha = ['rgba(60,170,211,0.05)', 'rgba(1,203,179,0.05)', 'rgba(133,230,71,0.05)', 'rgba(93,92,218,0.05)', 'rgba(5,197,176,0.05)', 'rgba(194,153,39,0.05)']
      this.chartRose.setOption({
        title: {
          text: '预约状态统计(玫瑰图)',
          // subtext: '纯属虚构',
          x: 'center',
          textStyle: {// 主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
            color: "#ffffff"
          }
        },
        backgroundColor: '#090e36',
        grid: {
          left: -100,
          top: 50,
          bottom: 10,
          right: 10,
          containLabel: true
        },
        tooltip: {
          trigger: 'item',
          formatter: "{b} : {c} ({d}%)"
        },
        legend: {
          show: false
        },
        polar: {},
        angleAxis: {
          interval: 1,
          type: 'category',
          data: [],
          z: 10,
          axisLine: {
            show: false,
            lineStyle: {
              color: "#0B4A6B",
              width: 1,
              type: "solid"
            }
          },
          axisLabel: {
            interval: 0,
            show: true,
            color: "#0B4A6B",
            margin: 8,
            fontSize: 16
          }
        },
        radiusAxis: {
          min: 20,
          max: 120,
          interval: 20,
          axisLine: {
            show: false,
            lineStyle: {
              color: "#0B3E5E",
              width: 1,
              type: "solid"
            }
          },
          axisLabel: {
            formatter: '{value} %',
            show: false,
            padding: [0, 0, 10, 0],
            color: "#0B3E5E",
            fontSize: 16
          },
          splitLine: {
            lineStyle: {
              color: "#07385e",
              width: 2,
              type: "dashed"
            }
          }
        },
        calculable: true,
        series: [{
          stack: 'a',
          type: 'pie',
          radius: '80%',
          roseType: 'radius',
          zlevel: 10,
          startAngle: 100,
          label: {
            normal: {
              formatter: ['{b|{b}}', '{d|{d}%}'].join('\n'),
              rich: {
                b: {
                  color: '#3bd2fe',
                  fontSize: 14,
                  lineHeight: 20
                },
                d: {
                  color: '#d0fffc',
                  fontSize: 14,
                  height: 20
                }
              }
            }
          },
          labelLine: {
            normal: {
              show: true,
              length: 10,
              length2: 45,
              lineStyle: {
                color: '#0096b1'
              }
            },
            emphasis: {
              show: false
            }
          },
          data: [],
          itemStyle: {
            borderColor: colorArr[2],
            borderWidth: 2,
            shadowBlur: 20,
            shadowColor: colorArr[2],
            shadowOffsetx: 25,
            shadowOffsety: 20,
            color: colorAlpha[2]
          }
        }
        ]
      })
    }
  },
  created() {
    this.getAllMonthPay()
  },
  mounted() {
    this.getTransactionGoodsPercent()
    this.drawCharts()
    this.getReservationPercent()
    this.drawRoseCharts()
  }
}
</script>
<style scoped lang="stylus">
.homepage-container
  min-width 580px

.home-total {
  width: 100%;
  height: 350px;
  //height: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 0 0 15px 0;

  .home-total-item {
    box-sizing: border-box;
    display: inline-block;
    height: 100%;
    padding: 15px 0;
    vertical-align: top;

    .wrapper-item {
      height: 100%;
      padding: 0 20px;
      border-right: 1px solid #ccc;
      text-align: center;

      .title {
        margin: 0px 0;
      }

      .value {
        margin 5px 0
        font-size 34px
        color: #ffc107
      }
    }

    &:last-child {
      .wrapper-item {
        border: none;
      }
    }
  }
}

.home-part1 {
  margin: 0 !important;

  .near-six-month {
    border: 1px solid #eee;
    height: 300px;

    .title {
      background: #dde3ef;
      padding: 10px 0;

      .title-value {
        margin-left: 4px;
        text-indent: 4px;
        color: #666;

        &:before {
          display: inline-block;
          content: '';
          width: 4px;
          height: 16px;
          background: purple;
          margin-right: 4px;
          border-radius: 4px;
          vertical-align: middle;
        }
      }
    }

    .content {
      width: 100%;
      height: 260px;
    }
  }

  .detail-item-wrapper {
    display: flex
    height: 300px
    overflow: hidden;
    flex-wrap: wrap;
    flex-flow: row wrap;
    justify-content: space-around;
    align-content: space-around;
    padding: 0 10px;
    color: #fff;

    .home-detail-item {
      flex: 0 0 48%
      height: 145px
      border: 1px solid #eee
      background-image linear-gradient(rgba(255, 255, 255, .1), rgba(255, 255, 255, .3)) !important
      cursor pointer
    }

    .home-detail-item:hover {
      background-image none !important
    }

    .home-detail-item:nth-child(3), .home-detail-item:nth-child(4) {
      margin-top: 10px;
    }

    .home-detail-item {
      .name {
        padding: 30px 0 10px 0;
        text-align: center;
        font-size: 20px;
      }

      .value {
        text-align: center;

        .num {
          font-size: 28px;
        }
      }
    }
  }

  .rank {
    .title {
      background: #dde3ef;
      padding: 10px 0;

      .title-value {
        margin-left: 4px;
        text-indent: 4px;
        color: #666;

        &:before {
          display: inline-block;
          content: '';
          width: 4px;
          height: 16px;
          background: purple;
          margin-right: 4px;
          border-radius: 4px;
          vertical-align: middle;
        }
      }
    }

    .content {
      position: relative;
      width: 100%;
      height: 260px;
      overflow: hidden;

      .wrapper-user {
        margin: 0;
        list-style: none;
        padding-left: 0;

        .user-item {
          height: 50px;
          padding: 5px;

          .avatar {
            border: 1px solid #888;
            border-radius: 100px;
            vertical-align: bottom;
          }

          .user-info {
            display: inline-block;
            padding-left: 5px;

            .name {
              color: #999;
              font-size: 14px;
            }

            .value {
              color: red;
            }
          }
        }
      }
    }
  }
}

.home-part2 {
  margin-top: 15px;

  .financing-sprinkled {
    border: 1px solid #eee;
    height: 350px;

    .title {
      background: #dde3ef;
      padding: 10px 0;

      .title-value {
        margin-left: 4px;
        text-indent: 4px;
        color: #666;

        &:before {
          display: inline-block;
          content: '';
          width: 4px;
          height: 16px;
          background: purple;
          margin-right: 4px;
          border-radius: 4px;
          vertical-align: middle;
        }
      }
    }

    .content {
      display: inline-flex;
      width: 100%;
      height: 310px;

      .investment {
        height: 310px;
        width: 50%;

        .title {
          display: inherit;
          text-align: center;
          background: transparent;
          padding-top: 20px;
        }

        .detail {
          margin-left: 10px;
          text-align: center;

          .detail-item {
            display: inline-block;
            width: 40%;
            margin: 5px;
            padding-left: 5px;
            border-left: 5px solid #ccc;
            color: #666;
          }
        }
      }

      .financing {
        height: 310px;
        width: 50%;

        .title {
          display: inherit;
          text-align: center;
          background: transparent;
          padding-top: 20px;
        }

        .detail {
          margin-left: 10px;
          text-align: center;

          .detail-item {
            display: inline-block;
            width: 40%;
            margin: 5px;
            padding-left: 5px;
            border-left: 5px solid #ccc;
            color: #666;
          }
        }
      }
    }
  }

  .bad-debt {
    height: 350px;
    margin-left: 10px;
    border: 1px solid #eee;

    .title {
      background: #dde3ef;
      padding: 10px 0;

      .title-value {
        margin-left: 4px;
        text-indent: 4px;
        color: #666;

        &:before {
          display: inline-block;
          content: '';
          width: 4px;
          height: 16px;
          background: purple;
          margin-right: 4px;
          border-radius: 4px;
          vertical-align: middle;
        }
      }
    }

    .content {
      height: inherit;

      .bad {
        height: 50%;
        padding: 20px 15px;

        .total {
          display: inline-block;
          width: 30%
          color: #666;
          vertical-align: top;

          .total1 {
            text-align: center;

            .num {
              font-size: 24px;
            }
          }

          .total2 {
            text-align: center;
            margin-top: 20px;

            .num {
              font-size: 24px;
            }
          }
        }

        .chart {
          display: inline-block;
          width: 68%;

          .title {
            background: none;
            border-bottom: 1px solid #ccc;
          }

          .line {
            border-bottom: 1px solid #ccc;
            padding-bottom: 30px;

            &:last-child {
              border-bottom-color: #000;
            }
          }

          &:after {
            content: '0';
            position: relative;
            font-size: 70px;
            left: 20px;
            top: -70px;
            color: #ddd;
          }
        }
      }

      .overdue {
        padding: 20px 15px;
        height: 50%;

        .total {
          display: inline-block;
          width: 30%
          color: #666;
          vertical-align: top;

          .total1 {
            text-align: center;

            .num {
              font-size: 24px;
            }
          }

          .total2 {
            text-align: center;
            margin-top: 20px;

            .num {
              font-size: 24px;
            }
          }
        }

        .chart {
          display: inline-block;
          width: 68%

          .title {
            background: none;
            border-bottom: 1px solid #ccc;
          }

          .line {
            border-bottom: 1px solid #ccc;
            padding-bottom: 30px;

            &:last-child {
              border-bottom-color: #000;
            }
          }

          &:after {
            content: '0';
            position: relative;
            font-size: 70px;
            left: 20px;
            top: -70px;
            color: #ddd;
          }
        }
      }
    }
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.content /deep/ .bscroll-vertical-scrollbar
  z-index 2 !important
</style>
