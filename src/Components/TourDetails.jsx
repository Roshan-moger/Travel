
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  Star,
  Phone,
  Calendar,
  Shield,
  Camera,
  Utensils,
  Wifi,
  Car,
  Plane,
  Coffee,
} from "lucide-react"
import toast from "react-hot-toast"
import { toursData } from "../data/tourPackages.js"
import { itineraryTemplates } from "../data/itineraryTemplates.js"
import { generateHighlights } from "../data/generateHighlights.js"

// Generate dynamic itinerary based on tour duration and location
const generateItinerary = (tour) => {
  const days = Number.parseInt(tour.duration)
  const location = tour.location

  const templates = itineraryTemplates[location] || itineraryTemplates["India"]
  return templates.slice(0, days).map((title, index) => ({
    day: index + 1,
    title,
    description: `Explore and experience the best of ${location} with guided tours, local interactions, and memorable activities. Immerse yourself in the culture, history, and natural beauty of this amazing destination.`,
  }))
}

export default function TourDetails() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [tour, setTour] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const { id } = useParams()
  const navigate = useNavigate()

  // Fetch tour data based on URL parameter
  useEffect(() => {
    const tourId = Number.parseInt(id)
    if (isNaN(tourId)) {
      setLoading(false)
      return
    }

    const foundTour = toursData.find((t) => t.id === tourId)
    if (foundTour) {
      const additionalImages = [foundTour.image, foundTour.image, foundTour.image, foundTour.image]
      setTour({
        ...foundTour,
        images: additionalImages,
        originalPrice: Math.round(foundTour.price * 1.2),
        category: foundTour.range.includes("$1000")
          ? "Luxury"
          : foundTour.range.includes("$500")
            ? "Premium"
            : "Budget",
        groupSize: "2-15 people",
        languages: ["English", "Local Language"],
        difficulty: foundTour.duration.includes("8") || foundTour.duration.includes("7") ? "Moderate" : "Easy",
        highlights: generateHighlights(foundTour.location),
        itinerary: generateItinerary(foundTour),
        included: [
          "Round-trip transportation",
          `${foundTour.duration} accommodation`,
          "Daily breakfast",
          "Professional tour guide",
          "Entrance fees to attractions",
          "Travel insurance",
          "Airport transfers",
        ],
        notIncluded: [
          "Personal expenses",
          "Lunch and dinner (except mentioned)",
          "Tips and gratuities",
          "Alcoholic beverages",
          "Spa treatments",
          "International flights",
        ],
      })
    }
    setLoading(false)
  }, [id])

  const handleBook = () => {
    toast.success("Successfully booked! Wait for further information", {
      duration: 4000,
      position: "top-center",
    })
    setTimeout(() => {
      navigate("/dashboard")
    }, 2000)
  }

  const handleGoBack = () => {
    navigate(-1)
  }


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-3 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tour details...</p>
        </div>
      </div>
    )
  }

  if (!tour) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Tour Not Found</h1>
          <p className="text-gray-600 mb-6">The tour you're looking for doesn't exist.</p>
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header with back button */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side - Images */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
            
              <img
                src={ tour.image}
                alt={tour.title}
                className="object-cover"
                crossOrigin="anonymous"
              />
              <span className="absolute top-4 left-4 bg-green-600 text-white px-2 py-1 rounded-md text-sm">
                {tour.category}
              </span>
            </div>

            {/* Thumbnail images */}
            <div className="grid grid-cols-4 gap-2">
              {tour.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? "border-blue-500" : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image || "/images/placeholder.jpg"}
                    alt={`${tour.title} ${index + 1}`}
                    className="object-cover"
                    crossOrigin="anonymous"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right side - Tour Information */}
          <div className="space-y-6">
            {/* Title and basic info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{tour.title}</h1>
              <p className="text-gray-600 text-lg mb-4">{tour.description}</p>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{tour.rating}</span>
                  <span className="text-gray-500">({tour.reviews} reviews)</span>
                </div>
                <span className="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded-md text-sm">
                  <Users className="h-3 w-3" />
                  {tour.groupSize}
                </span>
              </div>
            </div>

            {/* Quick info cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">Duration</span>
                </div>
                <p className="text-sm text-gray-600">{`${parseInt(tour.duration)} days - ${parseInt(tour.duration) - 1} nights`}</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-red-600" />
                  <span className="font-medium">Location</span>
                </div>
                <p className="text-sm text-gray-600">{tour.location}</p>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-green-600">${tour.price}</span>
                    <span className="text-lg text-gray-500 line-through">${tour.originalPrice}</span>
                  </div>
                  <p className="text-sm text-gray-600">per person</p>
                </div>
                <span className="bg-red-600 text-white px-2 py-1 rounded-md text-sm">
                  Save ${tour.originalPrice - tour.price}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Only {tour.tickets} spots left!</span>
              </div>

              <button
                onClick={handleBook}
                className="w-full bg-green-600 text-white text-lg py-3 rounded-md hover:bg-green-700"
              >
                Book Now - ${tour.price}
              </button>

              <div className="flex items-center justify-center gap-2 mt-3 text-sm text-gray-500">
                <Shield className="h-4 w-4" />
                <span>Free cancellation up to 24 hours before</span>
              </div>
            </div>

            {/* Contact info */}
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Contact:</span>
                <span className="text-blue-600">{tour.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="mt-12">
          <div className="grid grid-cols-4 bg-gray-100 rounded-t-lg">
            {["overview", "itinerary", "included", "details"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-4 text-center font-medium ${
                  activeTab === tab ? "bg-white text-blue-600 border-t-2 border-blue-600" : "text-gray-600"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                  <Camera className="h-5 w-5" />
                  Tour Highlights
                </h2>
                <ul className="space-y-2">
                  {tour.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-lg font-semibold mb-4">About This Experience</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Embark on an unforgettable journey to {tour.location} where adventure meets culture. This
                  carefully crafted {tour.duration} experience offers the perfect blend of exploration, relaxation,
                  and authentic local encounters that will create memories to last a lifetime.
                </p>
                <p className="text-sm text-gray-600">
                  Our expert guides will take you through the most spectacular sights while ensuring your comfort
                  and safety throughout the journey. From cultural immersion to breathtaking landscapes, every
                  moment is designed to exceed your expectations.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {tour.languages.map((lang) => (
                    <span key={lang} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Itinerary Tab */}
          {activeTab === "itinerary" && (
            <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold mb-2">Day by Day Itinerary</h2>
              <p className="text-sm text-gray-500 mb-4">Detailed schedule of your amazing journey</p>
              <div className="space-y-6">
                {tour.itinerary.map((day, index) => (
                  <div key={day.day} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {day.day}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{day.title}</h3>
                      <p className="text-gray-600 text-sm">{day.description}</p>
                      {index < tour.itinerary.length - 1 && <hr className="mt-4" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Included Tab */}
          {activeTab === "included" && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-lg font-semibold text-green-600 mb-4">✓ What's Included</h2>
                <ul className="space-y-2">
                  {tour.included.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-lg font-semibold text-red-600 mb-4">✗ Not Included</h2>
                <ul className="space-y-2">
                  {tour.notIncluded.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Details Tab */}
          {activeTab === "details" && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-lg font-semibold mb-4">Tour Information</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Accommodation:</span>
                    <p className="text-gray-600">{tour.accommodation}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Difficulty:</span>
                    <p className="text-gray-600">{tour.difficulty}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Group Size:</span>
                    <p className="text-gray-600">{tour.groupSize}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Budget Range:</span>
                    <p className="text-gray-600">{tour.range}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                  <Utensils className="h-5 w-5" />
                  Additional Services
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Wifi className="h-4 w-4 text-blue-600" />
                    <span>Free WiFi</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Car className="h-4 w-4 text-green-600" />
                    <span>Transportation</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Plane className="h-4 w-4 text-purple-600" />
                    <span>Airport Transfer</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Coffee className="h-4 w-4 text-orange-600" />
                    <span>Welcome Drink</span>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-xs text-gray-500">
                    * Terms and conditions apply. Please read our full terms before booking.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
