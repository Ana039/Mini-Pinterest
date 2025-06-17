'use client'
import { Pin } from '@/app/types/pin'
import PinCard from './PinCard'

interface PinGridProps {
  pins: Pin[]
  onPinClick: (pin: Pin) => void
}

export default function PinGrid({ pins, onPinClick }: PinGridProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
        {pins.map((pin) => (
          <PinCard
            key={pin.id}
            pin={pin}
            onClick={onPinClick}
          />
        ))}
      </div>
    </div>
  )
}