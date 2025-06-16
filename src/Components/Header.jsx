// src/components/Header.jsx
import { MapPin } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="h-8 w-8 text-blue-400" />
            <h1 className="text-2xl font-bold">Tours & Travel</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="hover:text-blue-400 transition-colors">Home</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Tours</a>
            <a href="#" className="hover:text-blue-400 transition-colors">About</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
          </nav>
        </div>
      </div>
    </header>
  )
} 
