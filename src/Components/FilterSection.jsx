
import { Search } from "lucide-react"

export default function FilterSection({
  searchFilters,
  onFilterChange,
  onSearch,
  accommodationTypes,
  duration,
  maxRanges,
  minRanges
}) {
  const renderSelect = (label, field, options) => (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <select
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={searchFilters[field]}
        onChange={(e) => onFilterChange(field, e.target.value)}
      >
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  )

  const renderLocationInput = () => (
    <div>
      <label className="block text-sm font-medium mb-2">Location</label>
      <input
        type="text"
        placeholder="Enter destination city or country..."
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={searchFilters.destination || ""}
        onChange={(e) => onFilterChange("destination", e.target.value)}
      />
    </div>
  )

  return (
    <section className="text-black py-12">
      <div className="container border-0 rounded-2xl mx-auto">
        <div className="w-8xl mx-auto p-4 rounded-t-2xl bg-gradient-to-r from-blue-600 to-blue-400">
          <h2 className="text-3xl font-bold mb-2 text-white">Find Your Perfect Adventure</h2>
          <p className="text-blue-100 mb-0">Customize your search to discover amazing tours</p>
        </div>
        <div className="w-8xl mx-auto rounded-b-2xl bg-white backdrop-blur-sm border border-white/20 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {renderLocationInput()}
            {renderSelect("Accommodation Type", "accommodation", accommodationTypes)}
            {renderSelect("duration", "duration", duration)}
            {renderSelect("Minimum Budget", "minBudget", minRanges)}
            {renderSelect("Maximum Budget", "maxBudget", maxRanges)}
            <button
              onClick={onSearch}
              className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-400 hover:bg-blue-700 text-white px-8 py-3 mt-6 rounded-md transition shadow-lg"
            >
              <Search className="h-4 w-4 mr-2" />
              Search Now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
