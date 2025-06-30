'use client'

import { useState } from 'react'
import API, { setAuthToken } from '@/lib/api'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await API.post('/auth/login/', { username, password })

      const { token, user } = res.data
      localStorage.setItem('authToken', token)
      setAuthToken(token)

      // Optionally store user data in local storage or context
      alert(`Welcome back, ${user.username}!`)
      router.push('/')
    } catch (err: any) {
      const errorData = err.response?.data
      if (errorData) {
        const firstError = Object.values(errorData)[0]
        if (typeof firstError === 'string') {
          setError(firstError)
        } else if (Array.isArray(firstError)) {
          setError(firstError[0])
        } else {
          setError('Login failed')
        }
      } else {
        setError('Login failed')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white rounded-lg shadow-md p-8"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Log In</h1>

        {error && (
          <p className="mb-4 text-center text-red-600 font-semibold">{error}</p>
        )}

        <label className="block mb-2 font-semibold">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <label className="block mb-2 font-semibold">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-3 rounded font-semibold hover:bg-red-700 transition"
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </main>
  )
}
