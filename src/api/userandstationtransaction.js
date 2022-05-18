import axios from 'axios'

export function dirUandSTransaction() {
  return axios.get('/userandstationtransaction/dirUandSTransaction')
}

export function dirGoodsPercent() {
  return axios.get('/userandstationtransaction/dirGoodsPercent')
}

export function dirReservationPercent() {
  return axios.get('/userandstationtransaction/dirReservationPercent')
}
