import { create } from 'apisauce'
import apiMonitor from './monitor'

const api = create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'http://127.0.0.1:8080' // change for prod deployment
      : 'http://127.0.0.1:8080',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
})

api.addMonitor(apiMonitor)

export default api
