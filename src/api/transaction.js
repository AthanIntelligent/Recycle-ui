import axios from 'axios'

export function dirTransaction(data) {
  return axios.post('/transaction/dirTransaction',data)
}

export function addTransaction(data) {
  return axios.post('/transaction/addTransaction',data)
}

export function getTransactionGoods(data) {
  return axios.get('/transaction/getTransactionGoods?transactionId='+data)
}
