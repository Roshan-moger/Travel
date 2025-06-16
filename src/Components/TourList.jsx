import TourCard from "./TourCard"

export default function TourList({ tours }) {
  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">All Tours</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => <TourCard key={tour.id} tour={tour} />)}
        </div>
      </div>
    </section>
  )
}
