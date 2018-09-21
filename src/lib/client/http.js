import axios from 'axios'

const http = axios.create({
  baseURL: 'http://api.globalid.mati.io/api/v1'
})

export default http
