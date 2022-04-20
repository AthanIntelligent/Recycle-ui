import axios from 'axios'

export function dirGoods(goods) {
  return axios.post('/goods/dirGoods',goods)
}

export function addGoods(goods) {
  return axios.post('/goods/addGoods', goods)
}

export function delGoods(uuid) {
  return axios.delete('/goods/delGoods/'+uuid)
}

export function updGoods(goods, file) {
  return axios.post('/goods/updGoods', goods, file)
}

export function getGoods(uuid) {
  return axios.get('/goods/getGoods?uuid='+uuid)
}
