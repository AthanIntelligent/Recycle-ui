import axios from 'axios'

export function dirReservation(data) {
  return axios.post('/reservation/dirReservation',data)
}

export function addReservation(data) {
  return axios.post('/reservation/addReservation',data)
}
