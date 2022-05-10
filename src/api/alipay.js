import axios from "axios";

export function toPay (data) {
  return axios.post('/api/pay/alipay', data)
}
