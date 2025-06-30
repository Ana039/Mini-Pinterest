
'use client' // necessary for client-side rendering

import { useEffect } from 'react'
import { setAuthToken } from '@/lib/api'

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      setAuthToken(token)
    } else {
      setAuthToken(null) // Clear token if none found
    }
  }, [])

  return <>{children}</>
}
