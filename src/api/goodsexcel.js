import axios from 'axios'

export function getTemplate() {
  return axios.get('/goods/excel/getTemplate')
}

export function importG() {
  return axios.post('/goods/excel/import')
}

export function delGoods(uuid) {
  return axios.delete('/goods/delGoods/'+uuid)
}
