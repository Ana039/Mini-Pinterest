'use client'

import { useEffect, useState, useMemo } from 'react'
import Header from './components/Header'
import PinGrid from './components/PinGrid'
import PinModal from './components/PinModal'
import { Pin } from './types/pin'

export default function Home() {
  const [pins, setPins] = useState<Pin[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null)

  useEffect(() => {
    async function fetchPins() {
      try {
        const res = await fetch('http://localhost:8000/api/pins/')
        if (!res.ok) throw new Error('Failed to fetch pins')
        const data = await res.json()
        setPins(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchPins()
  }, [])

  const filteredPins = useMemo(() => {
    if (!searchQuery) return pins

    return pins.filter(pin =>
      pin.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (pin.description && pin.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      pin.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }, [searchQuery, pins])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handlePinClick = (pin: Pin) => {
    setSelectedPin(pin)
  }

  const handleCloseModal = () => {
    setSelectedPin(null)
  }

  if (loading) return <p>Loading pins...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="min-h-screen bg-white">
      <Header onSearch={handleSearch} />

      <main>
        {searchQuery && (
          <div className="max-w-7xl mx-auto px-4 py-4">
            <p className="text-gray-600">
              {filteredPins.length} results for "{searchQuery}"
            </p>
          </div>
        )}

        <PinGrid pins={filteredPins} onPinClick={handlePinClick} />
      </main>

      {selectedPin && (
        <PinModal pin={selectedPin} isOpen={!!selectedPin} onClose={handleCloseModal} />
      )}
    </div>
  )
}
