"use client"

import { useState } from "react"

// Simple mock data
const mockAppointments = [
  { id: 1, date: "2025-04-15", time: "10:00 AM", dentist: "Dr. Smith", type: "Check-up", status: "Scheduled" },
  { id: 2, date: "2025-05-20", time: "2:30 PM", dentist: "Dr. Smith", type: "Cleaning", status: "Scheduled" },
  { id: 3, date: "2025-03-10", time: "11:00 AM", dentist: "Dr. Johnson", type: "Filling", status: "Completed" },
]

export default function DentalClinicApp() {
  const [currentPage, setCurrentPage] = useState("home")
  const [user, setUser] = useState(null)
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [loginError, setLoginError] = useState("")

  // Simple login function
  const handleLogin = (e) => {
    e.preventDefault()

    if (loginEmail === "admin@example.com" && loginPassword === "password") {
      setUser({ role: "admin", name: "Admin User" })
      setCurrentPage("dashboard")
    } else if (loginEmail === "patient@example.com" && loginPassword === "password") {
      setUser({ role: "patient", name: "John Doe" })
      setCurrentPage("dashboard")
    } else if (loginEmail === "dentist@example.com" && loginPassword === "password") {
      setUser({ role: "dentist", name: "Dr. Smith" })
      setCurrentPage("dashboard")
    } else {
      setLoginError("Invalid email or password")
    }
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentPage("home")
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <button onClick={() => setCurrentPage("home")} className="text-2xl font-bold text-blue-600">
                  DentalCare
                </button>
              </div>
            </div>
            <div className="flex items-center">
              {user ? (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setCurrentPage("dashboard")}
                    className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => setCurrentPage("appointments")}
                    className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Appointments
                  </button>
                  <div className="relative">
                    <div className="flex items-center">
                      <span className="text-gray-700 mr-2">{user.name}</span>
                      <button
                        type="button"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setCurrentPage("login")}
                    className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </button>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Home Page */}
        {currentPage === "home" && (
          <div className="bg-white">
            <div className="relative bg-gradient-to-r from-blue-500 to-blue-700 py-24 px-4">
              <div className="relative max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                  Professional Dental Care
                </h1>
                <p className="mt-6 max-w-3xl text-xl text-blue-50">
                  We provide comprehensive dental services for the whole family. Our experienced dentists and friendly
                  staff are dedicated to making your visit as comfortable as possible.
                </p>
                <div className="mt-10 flex space-x-4">
                  <button
                    onClick={() => setCurrentPage("login")}
                    className="inline-block bg-white py-3 px-6 border border-transparent rounded-md text-base font-medium text-blue-700 hover:bg-blue-50"
                  >
                    Book Appointment
                  </button>
                  <button
                    onClick={() => setCurrentPage("login")}
                    className="inline-block bg-blue-600 py-3 px-6 border border-transparent rounded-md text-base font-medium text-white hover:bg-blue-700"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Login Page */}
        {currentPage === "login" && (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
            <div className="max-w-md w-full space-y-8">
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
              </div>
              {loginError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <span className="block sm:inline">{loginError}</span>
                </div>
              )}
              <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Email address"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Sign in
                  </button>
                </div>

                <div className="text-sm text-center text-gray-600">
                  <p>Demo Accounts:</p>
                  <p>admin@example.com / password</p>
                  <p>patient@example.com / password</p>
                  <p>dentist@example.com / password</p>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Dashboard */}
        {currentPage === "dashboard" && (
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

                <div className="border-t border-gray-200">
                  <ul className="divide-y divide-gray-200">
                    {mockAppointments
                      .filter((a) => a.status === "Scheduled")
                      .map((appointment) => (
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
                              <p className="flex items-center text-sm text-gray-500">{appointment.dentist}</p>
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
                            <div className="text-lg font-medium text-gray-900">{mockAppointments[0].date}</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-5 py-3">
                    <div className="text-sm">
                      <button
                        onClick={() => setCurrentPage("appointments")}
                        className="font-medium text-blue-600 hover:text-blue-500"
                      >
                        View All Appointments
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Appointments List */}
        {currentPage === "appointments" && (
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">My Appointments</h1>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Book New Appointment
              </button>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
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
                    {mockAppointments.map((appointment) => (
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
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto py-6 px-4 overflow-hidden sm:px-6 lg:px-8">
          <p className="mt-2 text-center text-base text-gray-400">
            &copy; 2025 DentalCare Clinic. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

