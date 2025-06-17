'use client'
import { X, Heart, Download, Share, MoreHorizontal } from 'lucide-react'
import { Pin } from '@/app/types/pin'
import { useState } from 'react'

interface PinModalProps {
  pin: Pin
  isOpen: boolean
  onClose: () => void
}

export default function PinModal({ pin, isOpen, onClose }: PinModalProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex">
          {/* Image */}
          <div className="flex-1 bg-gray-100">
            <img
              src={pin.imageUrl}
              alt={pin.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Content */}
          <div className="w-96 p-6 flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <MoreHorizontal size={20} />
                </button>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            {/* Pin Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{pin.title}</h1>
              {pin.description && (
                <p className="text-gray-600 mb-4">{pin.description}</p>
              )}

              {/* Author */}
              <div className="flex items-center mb-4">
                <img
                  src={pin.author.avatar}
                  alt={pin.author.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold">{pin.author.name}</p>
                  <p className="text-sm text-gray-500">124k followers</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {pin.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                <span>{pin.likes} likes</span>
                <span>{pin.saves} saves</span>
                <span>{pin.createdAt}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="p-3 hover:bg-gray-100 rounded-full"
                >
                  <Heart className={isLiked ? 'fill-red-500 text-red-500' : ''} size={20} />
                </button>
                <button className="p-3 hover:bg-gray-100 rounded-full">
                  <Share size={20} />
                </button>
                <button className="p-3 hover:bg-gray-100 rounded-full">
                  <Download size={20} />
                </button>
              </div>
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`px-6 py-3 rounded-full font-semibold ${
                  isSaved 
                    ? 'bg-black text-white' 
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                {isSaved ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}