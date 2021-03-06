import axios from 'axios'

export function dirStation(station) {
  return axios.post('/station/dirStation',station)
}

export function getStationLegal(userId) {
  return axios.get('/station/getStationLegal?userId='+userId)
}

export function updStation(station) {
  return axios.post('/station/updStation',station)
}

export function addStation(data) {
  return axios.post('/station/addStation',data)
}

export function getStationDetail(uuid) {
  return axios.get('/station/getStationDetail?uuid='+uuid)
}

export function getStationStatus(userId) {
  return axios.get('/station/getStationStatus?userId='+userId)
}

export function updateJoinStationActive(station) {
  return axios.post('/station/updateJoinStationActive',station)
}

