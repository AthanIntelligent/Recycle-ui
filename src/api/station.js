import axios from 'axios'

export function dirStation(station) {
  return axios.post('/station/dirStation',station)
}

export function getStationLegal(userId) {
  return axios.get('/station/getStationLegal?stationUuid='+userId)
}

export function updStation(station) {
  return axios.post('/station/updStation',station)
}

export function addStation(station) {
  return axios.post('/station/addStation',station)
}
