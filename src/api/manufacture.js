import axios from 'axios'

export function dirManufacture(facture) {
  return axios.post('/facture/dirManufacturers',facture)
}

export function addManufacture(manufacturers) {
  return axios.post('/facture/addManufacturers',manufacturers)
}

export function delManufacture(uuid) {
  return axios.post('/facture/delManufacturers',uuid)
}

export function getManufacture(uuid) {
  return axios.post('/facture/getManufacturers',uuid)
}
