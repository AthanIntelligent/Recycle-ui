import axios from 'axios'

export function dirStation(station) {
  return axios.post('/station/dirStation',station)
}

export function getStationLegal(stationUuid) {
  return axios.get('/station/getStationLegal?stationUuid='+stationUuid)
}
