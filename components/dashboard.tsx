"use client"

import { useContext } from "react"
import AuthContext from "@/contexts/auth-context"

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
]

export default function Dashboard({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  const { user } = useContext(AuthContext)

  // Upcoming appointments (not cancelled)
  const upcomingAppointments = mockAppointments.filter((appointment) => appointment.status === "Scheduled")

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">
          {user?.role === "admin"
            ? "Admin Dashboard"
            : user?.role === "dentist"
              ? "Dentist Dashboard"
              : "Patient Dashboard"}
        </h1>

        <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Your Upcoming Appointments</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Here are your scheduled dental appointments.</p>
          </div>

          {upcomingAppointments.length > 0 ? (
            <div className="border-t border-gray-200">
              <ul className="divide-y divide-gray-200">
                {upcomingAppointments.map((appointment) => (
                  <li key={appointment.id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <p className="text-sm font-medium text-blue-600 truncate">{appointment.type}</p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          <span>{appointment.date}</span>
                          <span className="mx-1">•</span>
                          <span>{appointment.time}</span>
                        </p>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {appointment.status}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <svg
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          {appointment.dentist}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <button className="text-blue-600 hover:text-blue-900">View Details</button>
                        <span className="mx-2">|</span>
                        <button className="text-red-600 hover:text-red-900">Cancel</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center py-4 border-t border-gray-200">
              <p className="text-gray-500">No upcoming appointments.</p>
              <button
                onClick={() => setCurrentPage("book-appointment")}
                className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Book an Appointment
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Next Appointment</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {upcomingAppointments.length > 0 ? upcomingAppointments[0].date : "No upcoming appointments"}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <button
                  onClick={() => setCurrentPage("book-appointment")}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Book New Appointment
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Medical Records</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">View History</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <button className="font-medium text-blue-600 hover:text-blue-500">Access Records</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

