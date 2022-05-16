import axios from 'axios'

export function dirUandSTransaction() {
  return axios.get('/userandstationtransaction/dirUandSTransaction')
}
