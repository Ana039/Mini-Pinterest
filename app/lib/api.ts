
import axios from 'axios'

// This file sets up an Axios instance for API requests
const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Helper to set token in headers
export const setAuthToken = (token: string | null) => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Token ${token}`
  } else {
    delete API.defaults.headers.common['Authorization']
  }
}

export default API
