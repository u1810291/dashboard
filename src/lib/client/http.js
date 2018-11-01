import axios from 'axios'

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

export default http

export function getAuthHeader(token) {
  return { Authorization: `Bearer ${token}` }
}

export function authorizedUrl(url, token) {
  return `${url}?access_token=${token}`
}