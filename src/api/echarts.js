import axios from 'axios'
// import jsonp from '@/common/jsonp'
// import { isDev } from '@/utils'

function getData() {
  return axios({
    method: 'get',
    url: '/echarts/getStationDisplayData'
  })
}

function getDepartTop() {
  return axios({
    method: 'get',
    url: '/echarts/getStationTop'
  })
}
function getPieGoodsType() {
  return axios({
    method:'get',
    url:'/echarts/getPieGoodsType'
  })
}
function getBarGoodsTop10() {
  return axios({
    method:'get',
    url:'/echarts/getBarGoodsTop10'
  })
}


export { getData, getDepartTop ,getPieGoodsType,getBarGoodsTop10}
