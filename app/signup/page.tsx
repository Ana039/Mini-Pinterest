'use client'  // must be first line

import { useState } from 'react'
import API from '@/lib/api'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== password2) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      await API.post('/auth/register/', {
        username,
        email,
        first_name: firstName,
        last_name: lastName,
        password,
        password_confirm: password2,
      })
      alert('Registration successful! Please log in.')
      router.push('/login')
    } catch (err: any) {
      const errorData = err.response?.data
      if (errorData) {
        const firstError = Object.values(errorData)[0]
        if (typeof firstError === 'string') {
          setError(firstError)
        } else if (Array.isArray(firstError)) {
          setError(firstError[0])
        } else {
          setError('Registration failed')
        }
      } else {
        setError('Registration failed')
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
        <h1 className="text-3xl font-bold mb-6 text-center">Create an Account</h1>

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

        <label className="block mb-2 font-semibold">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <label className="block mb-2 font-semibold">First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <label className="block mb-2 font-semibold">Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <label className="block mb-2 font-semibold">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <label className="block mb-2 font-semibold">Confirm Password</label>
        <input
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
          className="w-full px-4 py-2 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-3 rounded font-semibold hover:bg-red-700 transition"
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </main>
  )
}
