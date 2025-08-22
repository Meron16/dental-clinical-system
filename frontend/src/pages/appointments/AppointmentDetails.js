import React from "react"
import { useParams } from "react-router-dom"

export default function AppointmentDetails() {
  const { id } = useParams()
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Appointment Details</h1>
      <p className="text-gray-600">Viewing appointment {id}</p>
    </div>
  )
}


