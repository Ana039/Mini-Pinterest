import { useState, useEffect, useMemo } from 'react'
import { Pin } from '@/types/pin'
import Header from '@/components/Header'
import PinGrid from '@/components/PinGrid'
import PinModal from '@/components/PinModal'


export default function Home() {
  const [pins, setPins] = useState<Pin[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
      pin.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pin.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }, [pins, searchQuery])

  if (loading) return <p>Loading pins...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="min-h-screen bg-white">
      <Header onSearch={setSearchQuery} />

      <main>
        {searchQuery && (
          <div className="max-w-7xl mx-auto px-4 py-4">
            <p className="text-gray-600">
              {filteredPins.length} results for "{searchQuery}"
            </p>
          </div>
        )}

        <PinGrid pins={filteredPins} onPinClick={setSelectedPin} />
      </main>

      <PinModal
        pin={selectedPin!}
        isOpen={!!selectedPin}
        onClose={() => setSelectedPin(null)}
      />
    </div>
  )
}
