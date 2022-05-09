import axios from 'axios'

export function dirUserInfo(user) {
  return axios.post('/user/dirUserInfo',user)
}

export function updUserInfo(user) {
  return axios.post('/user/updUserInfo',user)
}

export function dirStationUserList() {
  return axios.get('/user/dirStationUserList')
}

export function sendMessage(phone) {
  return axios.post('user/sendPhoneMessage',phone)
}

export function verifyPhoneCode(verifyCode) {
  return axios.post('user/verifyPhoneCode',verifyCode)
}



