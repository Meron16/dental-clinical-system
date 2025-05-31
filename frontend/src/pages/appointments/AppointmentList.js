"use client"

import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import api from "../../services/api"
import AuthContext from "../../contexts/AuthContext"

const AppointmentList = () => {
  const { user } = useContext(AuthContext)
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [filter, setFilter] = useState("upcoming")

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      const res = await api.get("/api/appointments")
      setAppointments(res.data)
      setError("")
    } catch (err) {
      setError("Failed to fetch appointments. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const cancelAppointment = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) {
      return
    }

    try {
      await api.delete(`/api/appointments/${id}`)
      // Update the appointment status in the UI
      setAppointments(
        appointments.map((appointment) =>
          appointment._id === id ? { ...appointment, status: "cancelled" } : appointment,
        ),
      )
    } catch (err) {
      setError("Failed to cancel appointment. Please try again.")
      console.error(err)
    }
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

  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">My Appointments</h1>
        <Link
          to="/appointments/book"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Book New Appointment
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

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
                    {user?.role === "dentist" ? "Patient" : "Dentist"}
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
                  <tr key={appointment._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatDate(appointment.date)}</div>
                      <div className="text-sm text-gray-500">
                        {appointment.startTime} - {appointment.endTime}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {user?.role === "dentist"
                          ? `${appointment.patient.firstName} ${appointment.patient.lastName}`
                          : `Dr. ${appointment.dentist.firstName} ${appointment.dentist.lastName}`}
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
                            onClick={() => cancelAppointment(appointment._id)}
                            className="text-red-600 hover:text-red-900 mr-4"
                          >
                            Cancel
                          </button>
                          <Link to={`/appointments/${appointment._id}`} className="text-blue-600 hover:text-blue-900">
                            View
                          </Link>
                        </>
                      )}
                      {appointment.status !== "scheduled" && (
                        <Link to={`/appointments/${appointment._id}`} className="text-blue-600 hover:text-blue-900">
                          View
                        </Link>
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

export default AppointmentList

