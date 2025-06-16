import toast from "react-hot-toast"
import { useLocation, useNavigate, useParams } from "react-router-dom"

export default function TourDetails() {
  const { id } = useParams()
  const location = useLocation()
  const tour = location.state?.tour
const navigate= useNavigate()
   const handleBook= ()=>{
    toast.success('Successfully booked! wait for further information')
navigate('/dashboard')
   }
  if (!tour) {
    return <div className="p-6 text-center">Tour data not available.</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={tour.image} alt={tour.title} className="w-full h-80 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{tour.title}</h1>
          <p className="text-gray-600 mb-4">{tour.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong>Duration:</strong> {tour.duration}</p>
            <p><strong>Location:</strong> {tour.location}</p>
            <p><strong>Accommodation:</strong> {tour.accommodation}</p>
            <p><strong>Price:</strong> ${tour.price}</p>
            <p><strong>Rating:</strong> {tour.rating} ⭐ ({tour.reviews} reviews)</p>
            <p><strong>Tickets Left:</strong> {tour.tickets}</p>
            <p><strong>Contact:</strong> {tour.phone}</p>
            <p><strong>Budget Range:</strong> {tour.range}</p>
          </div>
          <div className="mt-6">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg" onClick={handleBook}>
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
