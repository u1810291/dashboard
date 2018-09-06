import axios from 'axios'

const http = axios.create({
  baseURL: 'https://dev.mati.io/api/v1'
})

export default http
