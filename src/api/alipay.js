import axios from "axios";

export function toPay (data,data1) {
  return axios.post('/pay/alipay', {data,data1})
}
