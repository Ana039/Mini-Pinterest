'use client'
import { Search, Bell, MessageCircle, User } from 'lucide-react'
import SearchBar from './SearchBar'

interface HeaderProps {
  onSearch: (query: string) => void
}

export default function Header({ onSearch }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-red-600">PinIt</h1>
            <nav className="hidden md:flex space-x-4">
              <button className="px-4 py-2 rounded-full bg-black text-white font-semibold">
                Home
              </button>
              <button className="px-4 py-2 rounded-full hover:bg-gray-100 font-semibold">
                Create
              </button>
            </nav>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-2xl mx-4">
            <SearchBar onSearch={onSearch} />
          </div>

          {/* Profile */}
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MessageCircle size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <User size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
