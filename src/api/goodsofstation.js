import axios from 'axios'

export function getGoodsOfStationByStationId(stationId) {
  return axios.get('/goodsofstation/getGoodsOfStationByStationId/'+stationId)
}
