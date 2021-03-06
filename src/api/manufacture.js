import axios from 'axios'

export function dirManufacture(facture) {
  return axios.post('/facture/dirManufacturers', facture)
}

export function addManufacture(manufacturers) {
  return axios.post('/facture/addManufacturers', manufacturers)
}

export function delManufacture(uuid) {
  return axios.get('/facture/delManufacturers?uuid='+uuid)
}

export function getManufacture(uuid) {
  return axios.post('/facture/getManufacturers', uuid)
}

export function payStationManufacture(facture){
  return axios.post('/facture/toPayFacture', facture)
}

export function getFactoryTrade(uuid) {
  return axios.get('/facture/getFactoryTrade?factoryId=' + uuid)
}

export function getTradeGoods(uuid) {
  return axios.get('/facture/getTradeGoods?tradeId=' + uuid)
}

export function getMyMoney() {
  return axios.get('/facture/getMyMoney')
}
