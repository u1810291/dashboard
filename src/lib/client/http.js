import axios from 'axios'

const http = axios.create({
  baseURL: 'https://api.globalid.mati.io/api/v1'
})

export default http
