'use client'
import { Heart, MoreHorizontal } from 'lucide-react'
import { Pin } from '@/types/pin'
import { useState } from 'react'

interface PinCardProps {
  pin: Pin
  onClick: (pin: Pin) => void
}

export default function PinCard({ pin, onClick }: PinCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className="break-inside-avoid mb-4 group cursor-pointer">
      <div 
        className="relative bg-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
        onClick={() => onClick(pin)}
      >
        {/* Image */}
        <div className="relative">
          <img
            src={pin.imageUrl}
            alt={pin.title}
            className={`w-full h-auto transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            style={{ aspectRatio: `${pin.width}/${pin.height}` }}
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
          
          {/* Action buttons */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsSaved(!isSaved)
              }}
              className={`px-4 py-2 rounded-full font-semibold text-white ${
                isSaved ? 'bg-red-600' : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              {isSaved ? 'Saved' : 'Save'}
            </button>
          </div>

          {/* Bottom overlay with actions */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-white font-semibold text-sm line-clamp-2">
                  {pin.title}
                </h3>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsLiked(!isLiked)
                  }}
                  className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                >
                  <Heart 
                    size={16} 
                    className={`text-white ${isLiked ? 'fill-current' : ''}`} 
                  />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                  className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                >
                  <MoreHorizontal size={16} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Author info */}
      <div className="flex items-center mt-2 px-1">
        <img
          src={pin.author.avatar}
          alt={pin.author.name}
          className="w-6 h-6 rounded-full mr-2"
        />
        <span className="text-sm text-gray-600 truncate">{pin.author.name}</span>
      </div>
    </div>
  )
}
