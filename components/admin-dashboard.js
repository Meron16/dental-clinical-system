"use client"

import { useState, useEffect } from "react"
import { mockApi } from "../lib/mock-data"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDentists: 0,
    totalAppointments: 0,
    appointmentsToday: 0,
    appointmentsThisWeek: 0,
    appointmentsThisMonth: 0,
  })

  const [appointmentsByStatus, setAppointmentsByStatus] = useState({
    scheduled: 0,
    completed: 0,
    cancelled: 0,
    noShow: 0,
  })

  const [appointmentsByType, setAppointmentsByType] = useState({
    checkUp: 0,
    cleaning: 0,
    filling: 0,
    extraction: 0,
    rootCanal: 0,
    other: 0,
  })

  const [appointmentsByMonth, setAppointmentsByMonth] = useState([])
  const [recentAppointments, setRecentAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)

        // Fetch dashboard statistics
        const statsData = mockApi.getAdminStats()
        setStats(statsData)

        // Fetch appointment distribution by status
        const statusData = mockApi.getAppointmentsByStatus()
        setAppointmentsByStatus(statusData)

        // Fetch appointment distribution by type
        const typeData = mockApi.getAppointmentsByType()
        setAppointmentsByType(typeData)

        // Fetch appointment trends by month
        const trendData = mockApi.getAppointmentsByMonth()
        setAppointmentsByMonth(trendData)

        // Fetch recent appointments
        const recentData = mockApi.getRecentAppointments()
        setRecentAppointments(recentData)
      } catch (err) {
        console.error("Error fetching dashboard data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex space-x-4">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Manage Patients
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Manage Dentists
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Manage Appointments
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <p className="text-gray-500">Loading dashboard data...</p>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Patients</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{stats.totalPatients}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <button className="font-medium text-blue-600 hover:text-blue-500">View all patients</button>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
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
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Appointments</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{stats.totalAppointments}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <button className="font-medium text-blue-600 hover:text-blue-500">View all appointments</button>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Today's Appointments</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{stats.appointmentsToday}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <button className="font-medium text-blue-600 hover:text-blue-500">View today's schedule</button>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Appointments by Status</h3>
                <div className="h-64 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="bg-blue-100 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-blue-700">{appointmentsByStatus.scheduled}</div>
                      <div className="text-sm text-blue-600">Scheduled</div>
                    </div>
                    <div className="bg-green-100 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-green-700">{appointmentsByStatus.completed}</div>
                      <div className="text-sm text-green-600">Completed</div>
                    </div>
                    <div className="bg-red-100 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-red-700">{appointmentsByStatus.cancelled}</div>
                      <div className="text-sm text-red-600">Cancelled</div>
                    </div>
                    <div className="bg-yellow-100 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-yellow-700">{appointmentsByStatus.noShow}</div>
                      <div className="text-sm text-yellow-600">No-Show</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Appointments by Type</h3>
                <div className="h-64 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-2 w-full">
                    <div className="bg-blue-50 p-2 rounded-lg text-center">
                      <div className="text-xl font-bold text-blue-700">{appointmentsByType.checkUp}</div>
                      <div className="text-xs text-blue-600">Check-up</div>
                    </div>
                    <div className="bg-green-50 p-2 rounded-lg text-center">
                      <div className="text-xl font-bold text-green-700">{appointmentsByType.cleaning}</div>
                      <div className="text-xs text-green-600">Cleaning</div>
                    </div>
                    <div className="bg-purple-50 p-2 rounded-lg text-center">
                      <div className="text-xl font-bold text-purple-700">{appointmentsByType.filling}</div>
                      <div className="text-xs text-purple-600">Filling</div>
                    </div>
                    <div className="bg-red-50 p-2 rounded-lg text-center">
                      <div className="text-xl font-bold text-red-700">{appointmentsByType.extraction}</div>
                      <div className="text-xs text-red-600">Extraction</div>
                    </div>
                    <div className="bg-yellow-50 p-2 rounded-lg text-center">
                      <div className="text-xl font-bold text-yellow-700">{appointmentsByType.rootCanal}</div>
                      <div className="text-xs text-yellow-600">Root Canal</div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg text-center">
                      <div className="text-xl font-bold text-gray-700">{appointmentsByType.other}</div>
                      <div className="text-xs text-gray-600">Other</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg mb-8">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Monthly Appointment Trends</h3>
              <div className="h-80">
                <div className="flex items-end h-64 w-full">
                  {appointmentsByMonth.map((item, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div className="bg-blue-500 w-full mx-1" style={{ height: `${(item.count / 15) * 100}%` }}></div>
                      <div className="text-xs mt-2">{item.month}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Appointments */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Appointments</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">A list of the most recent appointments.</p>
            </div>
            <div className="border-t border-gray-200">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Patient
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
                        Date & Time
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
                    {recentAppointments.map((appointment) => (
                      <tr key={appointment._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {appointment.patient.firstName} {appointment.patient.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{appointment.patient.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            Dr. {appointment.dentist.firstName} {appointment.dentist.lastName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{formatDate(appointment.date)}</div>
                          <div className="text-sm text-gray-500">
                            {appointment.startTime} - {appointment.endTime}
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
                          <button className="text-blue-600 hover:text-blue-900">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

