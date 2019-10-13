import { create } from 'apisauce'

const api = create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'http://localhost:8081' // change for prod deployment
      : 'http://localhost:8081',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
})

export default api
