import axios from 'axios'

export function dirGoods() {
  return axios.get('/goods/dirGoods')
}

export function addGoods(goods, file) {
  return axios.post('/goods/addGoods', goods, file)
}

export function delGoods(uuid) {
  return axios.delete('/goods/delGoods/{uuid}')
}

export function updGoods(goods, file) {
  return axios.post('/goods/updGoods', goods, file)
}

export function getGoods(uuid) {
  return axios.get('/goods/getGoods', uuid)
}
