'use client'
import { useState, useMemo } from 'react'
import Header from './components/Header'
import PinGrid from './components/PinGrid'
import PinModal from './components/PinModal'
import { mockPins } from './data/mockPins'
import { Pin } from './types/pin'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null)

  const filteredPins = useMemo(() => {
    if (!searchQuery) return mockPins
    
    return mockPins.filter(pin =>
      pin.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pin.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pin.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }, [searchQuery])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handlePinClick = (pin: Pin) => {
    setSelectedPin(pin)
  }

  const handleCloseModal = () => {
    setSelectedPin(null)
  }

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

      <PinModal
        pin={selectedPin!}
        isOpen={!!selectedPin}
        onClose={handleCloseModal}
      />
    </div>
  )
}