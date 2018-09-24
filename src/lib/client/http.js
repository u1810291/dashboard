import axios from 'axios'

const http = axios.create({
  baseURL: 'https://api.globalid.mati.io'
})

export default http

export function getAuthHeader(token) {
  return { Authorization: `Bearer ${token}` }
}