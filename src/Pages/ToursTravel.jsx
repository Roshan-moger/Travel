"use client"
import { useState } from "react"
import Header from "../Components/Header"
import FilterSection from "../Components/FilterSection"
import TourList from "../Components/TourList"
import { accommodationTypes, duration, maxRanges, minRanges, toursData } from "../data/tourPackages.js"

export default function ToursTravel() {
  const [searchFilters, setSearchFilters] = useState({
    destination: "",
    accommodation: "Select accommodation",
    duration: "duration",
    minBudget: "0",
    maxBudget: "0",
  })

  const handleFilterChange = (field, value) => {
    setSearchFilters((prev) => ({ ...prev, [field]: value }))
  }

  const [filteredTours, setFilteredTours] = useState(toursData)
  const [showNotFound, setShowNotFound] = useState(false)

  // Fixed budget parsing function
  const parseBudgetValue = (budgetString) => {
    if (budgetString === "Any price" || budgetString === "0") return 0

    // Handle different formats like "$100", "100", "$100+", etc.
    const numericValue = budgetString.replace(/[$,+]/g, "")
    return Number.parseInt(numericValue, 10) || 0
  }

  const handleSearch = () => {
    const filtered = toursData.filter((tour) => {
      const { destination, accommodation, duration, minBudget, maxBudget } = searchFilters

      // Parse budget values correctly
      const minBudgetValue = parseBudgetValue(minBudget)
      const maxBudgetValue = parseBudgetValue(maxBudget)

      // Destination filter
      const destinationMatch =
        destination === "" ||
        tour.location.toLowerCase().includes(destination.toLowerCase()) ||
        tour.title.toLowerCase().includes(destination.toLowerCase())

      // Accommodation filter
      const accommodationMatch = accommodation === "Select accommodation" || tour.accommodation === accommodation

      // Duration filter
      const durationMatch = duration === "duration" || tour.duration === duration

      // Budget filter logic
      let budgetMatch = true

      if (minBudgetValue > 0 && maxBudgetValue > 0) {
        // Both min and max are set - price should be between them
        budgetMatch = tour.price >= minBudgetValue && tour.price <= maxBudgetValue
      } else if (minBudgetValue > 0) {
        // Only minimum is set - price should be >= minimum
        budgetMatch = tour.price >= minBudgetValue
      } else if (maxBudgetValue > 0) {
        // Only maximum is set - price should be <= maximum
        budgetMatch = tour.price <= maxBudgetValue
      }
      // If both are 0 or "Any price", show all tours (budgetMatch remains true)

      return destinationMatch && accommodationMatch && durationMatch && budgetMatch
    })

    if (filtered.length === 0) {
      setShowNotFound(true)
      setFilteredTours([])
      // Reset to show all tours after 3 seconds
      setTimeout(() => {
        setFilteredTours(toursData)
        setShowNotFound(false)
      }, 3000)
    } else {
      setShowNotFound(false)
      setFilteredTours(filtered)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <FilterSection
        searchFilters={searchFilters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        accommodationTypes={accommodationTypes}
        duration={duration}
        minRanges={minRanges}
        maxRanges={maxRanges}
      />
      {showNotFound ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-xl shadow-md transition duration-300 ease-in-out">
          <svg
            className="w-16 h-16 text-red-500 mb-4 animate-pulse"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z"
            />
          </svg>
          <p className="text-2xl font-bold text-red-600 mb-2">No Tours Found</p>
          <p className="text-gray-600 text-center max-w-md">
            Oops! We couldn't find any tours matching your criteria. Try adjusting your filters or explore all our
            amazing travel packages below.
          </p>
        </div>
      ) : (
        <TourList tours={filteredTours} />
      )}
    </div>
  )
}
