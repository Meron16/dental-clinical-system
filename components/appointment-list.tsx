"use client"

import { useState } from "react"

// Mock appointments
const mockAppointments = [
  {
    id: "1",
    date: "2025-04-15",
    time: "10:00 AM",
    dentist: "Dr. Sarah Smith",
    type: "Check-up",
    status: "Scheduled",
  },
  {
    id: "2",
    date: "2025-05-20",
    time: "2:30 PM",
    dentist: "Dr. Sarah Smith",
    type: "Cleaning",
    status: "Scheduled",
  },
  {
    id: "3",
    date: "2025-03-10",
    time: "11:00 AM",
    dentist: "Dr. Michael Johnson",
    type: "Filling",
    status: "Completed",
  },
]

export default function AppointmentList({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  const [filter, setFilter] = useState("upcoming")

  // Filter appointments based on selected filter
  const filteredAppointments = mockAppointments.filter((appointment) => {
    if (filter === "upcoming") {
      return appointment.status === "Scheduled"
    } else if (filter === "past") {
      return appointment.status === "Completed"
    } else if (filter === "cancelled") {
      return appointment.status === "Cancelled"
    }
    return true
  })

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">My Appointments</h1>
        <button
          onClick={() => setCurrentPage("book-appointment")}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
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

        {filteredAppointments.length === 0 ? (
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
                      <div className="text-sm font-medium text-gray-900">{appointment.date}</div>
                      <div className="text-sm text-gray-500">{appointment.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{appointment.dentist}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{appointment.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          appointment.status === "Scheduled"
                            ? "bg-green-100 text-green-800"
                            : appointment.status === "Completed"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {appointment.status === "Scheduled" && (
                        <>
                          <button className="text-red-600 hover:text-red-900 mr-4">Cancel</button>
                          <button className="text-blue-600 hover:text-blue-900">View</button>
                        </>
                      )}
                      {appointment.status !== "Scheduled" && (
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

