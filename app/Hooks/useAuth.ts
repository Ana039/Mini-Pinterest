// hooks/useAuth.ts
import { useState } from 'react'
import API, { setAuthToken } from '@/lib/api'

export function useAuth() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loginUser = async (username: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await API.post('/auth/login/', { username, password })
      const { token, user } = res.data
      localStorage.setItem('token', token)
      setAuthToken(token)
      return user
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { loginUser, loading, error }
}
