import axios from 'axios'

const http = axios.create({
<<<<<<< HEAD
  baseURL: 'https://staging.mati.io/api/v1'
=======
  baseURL: 'https://dev.mati.io/api/v1'
>>>>>>> 177bac9d4003547904d96548d23d691f35e2b71e
})

export default http
