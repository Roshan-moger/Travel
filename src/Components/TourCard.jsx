"use client"

import { useState } from "react"

export default function TourCard({ tour }) {
  const [isBooking, setIsBooking] = useState(false)

  const handleBook = () => {
    setIsBooking(true)
    // Simulate booking process
    setTimeout(() => {
      setIsBooking(false)
      alert("Booking initiated! You will be redirected to payment.")
    }, 1500)
  }

  const handleDetails = () => {
    alert("Showing tour details...")
  }

  return (
    <div className="w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Tour Image */}
      <div className="relative">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-40 object-cover"
        />
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Tour Title */}
        <h3 className="text-lg font-semibold text-gray-800">{tour.title}</h3>

        {/* Tour Description */}
        <p className="text-sm text-gray-600 mb-3 leading-relaxed">
          {tour.description}
        </p>
        <div className="flex gap-2 justify-between">

        {/* Price */}
        <div className="block">
          <span className="text-md font-bold text-green-500"> ${tour.price}</span>

        {/* Availability */}
        <p className="text-xs text-gray-500">{tour.tickets} tickets available</p>
        </div>
        <div className="flex">
<button
  onClick={handleBook}
  disabled={isBooking}
  className="w-18 bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white font-medium py-2 px-3 rounded text-sm mx-1"
>
  {isBooking ? "Booking..." : "Book"}
</button>
<button
  onClick={handleDetails}
  className="w-25 bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-2 rounded text-sm"
>
  Details
</button>
</div>
        </div>
      </div>
    </div>
  )
}
