import axios from 'axios'

export function login (userInfo) {
  return axios.post('/login', userInfo)
}

export function register (userInfo) {
  return axios.post('/register',userInfo)
}

export function userInfo() {
  return axios.get('/user/getUserInfo')
}

export function logout() {
  return axios.post('/logout')
}
