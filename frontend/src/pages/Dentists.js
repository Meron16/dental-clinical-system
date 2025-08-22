import React, { useState } from "react"
import { dentists } from "../data/dentists"
import AppointmentForm from "../components/AppointmentForm"

export default function Dentists() {
  const [selectedDentist, setSelectedDentist] = useState(null)

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1587502537608-1024f9b9fd1f?q=80&w=1600&auto=format&fit=crop"
          alt="Dentists hero"
          className="w-full h-72 object-cover"
        />
        <div className="absolute inset-0 bg-blue-700/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-extrabold text-white">Our Dentists</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Meet Our Expert Team</h2>
          <p className="mt-4 text-lg text-gray-600">
            Our experienced dentists are dedicated to providing you with the best dental care possible
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {dentists.map((d) => (
            <div key={d.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img src={d.image} alt={d.name} className="h-56 w-full object-cover" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{d.name}</h3>
                  <span className="text-sm text-yellow-600">★ {d.rating}</span>
                </div>
                <p className="text-sm text-blue-600 font-medium mb-2">{d.role}</p>
                <p className="text-sm text-gray-600 mb-3">{d.bio}</p>
                <p className="text-xs text-gray-400 mb-4">{d.years}+ years experience</p>
                
                <button
                  onClick={() => setSelectedDentist(selectedDentist === d.id ? null : d.id)}
                  className="w-full inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white text-sm font-semibold shadow-sm hover:bg-blue-700 transition-colors"
                >
                  {selectedDentist === d.id ? "Hide Booking Form" : `Book with ${d.name.split(" ")[1]}`}
                </button>
              </div>
              
              {/* Appointment Form */}
              {selectedDentist === d.id && (
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-200 pt-4">
                    <AppointmentForm 
                      dentistId={d.id} 
                      dentistName={d.name}
                      className="shadow-none border border-gray-200"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


