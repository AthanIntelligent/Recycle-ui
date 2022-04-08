import axios from 'axios'

export function dirGoodsType() {
  return axios.get('/goodstype/dirGoodsType')
}

export function addGoodsType(goodsType) {
  return axios.post('/goodstype/addGoodsType', goodsType)
}

export function delGoodsType(uuid) {
  return axios.delete('/goodstype/delGoodsType/' + uuid)
}
