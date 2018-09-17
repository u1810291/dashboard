import axios from 'axios'

const http = axios.create({
  baseURL: 'https://staging.mati.io/api/v1'
})

export default http
