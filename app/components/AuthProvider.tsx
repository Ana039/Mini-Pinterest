'use client'

import { useEffect } from 'react'
import { setAuthToken } from '@/lib/api'

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    setAuthToken(token)
  }, [])

  return <>{children}</>
}
