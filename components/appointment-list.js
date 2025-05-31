"use client"

import { useState, useEffect } from "react"
import { mockApi } from "../lib/mock-data"

export default function AppointmentList() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("upcoming")

  useEffect(() => {
    // Fetch appointments
    const fetchAppointments = async () => {
      try {
        const appointmentsData = mockApi.getAppointments()
        setAppointments(appointmentsData)
      } catch (error) {
        console.error("Error fetching appointments:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [])

  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Filter appointments based on selected filter
  const filteredAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (filter === "upcoming") {
      return appointmentDate >= today && appointment.status === "scheduled"
    } else if (filter === "past") {
      return appointmentDate < today || appointment.status === "completed"
    } else if (filter === "cancelled") {
      return appointment.status === "cancelled"
    }
    return true
  })

  const cancelAppointment = (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        mockApi.cancelAppointment(id)
        // Update the appointment status in the UI
        setAppointments(
          appointments.map((appointment) =>
            appointment.id === id ? { ...appointment, status: "cancelled" } : appointment,
          ),
        )
      } catch (error) {
        console.error("Error cancelling appointment:", error)
      }
    }
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">My Appointments</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Book New Appointment
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setFilter("upcoming")}
              className={`${
                filter === "upcoming"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilter("past")}
              className={`${
                filter === "past"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              Past
            </button>
            <button
              onClick={() => setFilter("cancelled")}
              className={`${
                filter === "cancelled"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              Cancelled
            </button>
          </nav>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <p className="text-gray-500">Loading appointments...</p>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No appointments found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date & Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Dentist
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatDate(appointment.date)}</div>
                      <div className="text-sm text-gray-500">
                        {appointment.startTime} - {appointment.endTime}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        Dr. {appointment.dentist.firstName} {appointment.dentist.lastName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1).replace("-", " ")}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          appointment.status === "scheduled"
                            ? "bg-green-100 text-green-800"
                            : appointment.status === "completed"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {appointment.status === "scheduled" && (
                        <>
                          <button
                            onClick={() => cancelAppointment(appointment.id)}
                            className="text-red-600 hover:text-red-900 mr-4"
                          >
                            Cancel
                          </button>
                          <button className="text-blue-600 hover:text-blue-900">View</button>
                        </>
                      )}
                      {appointment.status !== "scheduled" && (
                        <button className="text-blue-600 hover:text-blue-900">View</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

