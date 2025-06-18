"use client"

import { LocationEdit, User } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function Header() {
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleLoginClick = () => {
    setIsDropdownOpen(false)
    navigate("/")
  }

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
<LocationEdit strokeWidth={1.5}  className=" text-indigo-300"/>          
            <h1 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
              Tours & Travel
            </h1>
          </div>

          {/* User Icon with Dropdown */}
          <div className="relative">
            <button
              onClick={handleProfileClick}
              className="p-2 rounded-full text-white hover:text-blue-400 hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Profile"
            >
              <User className="h-6 w-6" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50 animate-slide-down">
                <button
                  onClick={handleLoginClick}
                  className="w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150 flex items-center space-x-2"
                >
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}