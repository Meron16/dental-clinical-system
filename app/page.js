"use client"

import { useState } from "react"

export default function DentalClinic() {
  const [currentView, setCurrentView] = useState("home")
  const [loggedIn, setLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const [username, setUsername] = useState("")
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: "2025-04-15",
      time: "10:00 AM",
      dentist: "Dr. Sarah Smith",
      type: "Check-up",
      status: "Scheduled",
    },
    {
      id: 2,
      date: "2025-05-20",
      time: "2:30 PM",
      dentist: "Dr. Sarah Smith",
      type: "Cleaning",
      status: "Scheduled",
    },
    {
      id: 3,
      date: "2025-03-10",
      time: "11:00 AM",
      dentist: "Dr. Michael Johnson",
      type: "Filling",
      status: "Completed",
    },
  ])

  // Login form state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")

  // Booking form state
  const [bookingDate, setBookingDate] = useState("")
  const [bookingTime, setBookingTime] = useState("")
  const [bookingDentist, setBookingDentist] = useState("")
  const [bookingType, setBookingType] = useState("Check-up")
  const [bookingSuccess, setBookingSuccess] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()

    // Simple login logic
    if (email === "admin@example.com" && password === "password") {
      setLoggedIn(true)
      setUserRole("admin")
      setUsername("Admin User")
      setCurrentView("dashboard")
    } else if (email === "patient@example.com" && password === "password") {
      setLoggedIn(true)
      setUserRole("patient")
      setUsername("John Doe")
      setCurrentView("dashboard")
    } else if (email === "dentist@example.com" && password === "password") {
      setLoggedIn(true)
      setUserRole("dentist")
      setUsername("Dr. Sarah Smith")
      setCurrentView("dashboard")
    } else {
      setLoginError("Invalid email or password")
    }
  }

  const handleLogout = () => {
    setLoggedIn(false)
    setUserRole(null)
    setUsername("")
    setCurrentView("home")
  }

  const handleBookAppointment = (e) => {
    e.preventDefault()

    // Add new appointment
    const newAppointment = {
      id: appointments.length + 1,
      date: bookingDate,
      time: bookingTime,
      dentist: bookingDentist,
      type: bookingType,
      status: "Scheduled",
    }

    setAppointments([...appointments, newAppointment])
    setBookingSuccess(true)

    // Reset form
    setBookingDate("")
    setBookingTime("")
    setBookingDentist("")
    setBookingType("Check-up")

    // Hide success message after 3 seconds
    setTimeout(() => {
      setBookingSuccess(false)
    }, 3000)
  }

  const cancelAppointment = (id) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id ? { ...appointment, status: "Cancelled" } : appointment,
      ),
    )
  }

  // Filter appointments for the current user
  const filteredAppointments = appointments.filter(
    (appointment) =>
      userRole === "admin" ||
      (userRole === "dentist" && appointment.dentist.includes("Sarah")) ||
      userRole === "patient",
  )

  // Upcoming appointments (not cancelled)
  const upcomingAppointments = filteredAppointments.filter((appointment) => appointment.status === "Scheduled")

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <button onClick={() => setCurrentView("home")} className="text-2xl font-bold text-blue-600">
                  DentalCare
                </button>
              </div>
            </div>
            <div className="flex items-center">
              {loggedIn ? (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setCurrentView("dashboard")}
                    className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => setCurrentView("appointments")}
                    className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Appointments
                  </button>
                  <button
                    onClick={() => setCurrentView("book")}
                    className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Book Appointment
                  </button>
                  <div className="relative">
                    <div className="flex items-center">
                      <span className="text-gray-700 mr-2">{username}</span>
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
                    onClick={() => setCurrentView("login")}
                    className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setCurrentView("register")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                  >
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
        {currentView === "home" && (
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
                    onClick={() => setCurrentView("login")}
                    className="inline-block bg-white py-3 px-6 border border-transparent rounded-md text-base font-medium text-blue-700 hover:bg-blue-50"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setCurrentView("register")}
                    className="inline-block bg-blue-600 py-3 px-6 border border-transparent rounded-md text-base font-medium text-white hover:bg-blue-700"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>

            <div className="py-12 bg-white">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center">
                  <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Why Choose Us</h2>
                  <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    Comprehensive Dental Care
                  </p>
                  <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                    We offer a wide range of dental services to meet all your oral health needs.
                  </p>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                        </div>
                        <h3 className="ml-3 text-lg leading-6 font-medium text-gray-900">Preventive Care</h3>
                      </div>
                      <div className="mt-4">
                        <p className="text-base text-gray-500">
                          Regular check-ups, cleanings, and preventive treatments to maintain your oral health.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </div>
                        <h3 className="ml-3 text-lg leading-6 font-medium text-gray-900">Restorative Dentistry</h3>
                      </div>
                      <div className="mt-4">
                        <p className="text-base text-gray-500">
                          Fillings, crowns, bridges, and implants to restore damaged or missing teeth.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <h3 className="ml-3 text-lg leading-6 font-medium text-gray-900">Cosmetic Dentistry</h3>
                      </div>
                      <div className="mt-4">
                        <p className="text-base text-gray-500">
                          Teeth whitening, veneers, and other cosmetic treatments to enhance your smile.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Login Page */}
        {currentView === "login" && (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
            <div className="max-w-md w-full space-y-8">
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                  Or{" "}
                  <button
                    onClick={() => setCurrentView("register")}
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    create a new account
                  </button>
                </p>
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <button className="font-medium text-blue-600 hover:text-blue-500">Forgot your password?</button>
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
        {currentView === "dashboard" && (
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <h1 className="text-2xl font-semibold text-gray-900">
                {userRole === "admin"
                  ? "Admin Dashboard"
                  : userRole === "dentist"
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
                              <button
                                className="text-red-600 hover:text-red-900"
                                onClick={() => cancelAppointment(appointment.id)}
                              >
                                Cancel
                              </button>
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
                      className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                      onClick={() => setCurrentView("book")}
                    >
                      Book an Appointment
                    </button>
                  </div>
                )}
              </div>

              {userRole === "admin" && (
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
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Total Patients</dt>
                            <dd className="flex items-baseline">
                              <div className="text-2xl font-semibold text-gray-900">24</div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
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
                              <div className="text-2xl font-semibold text-gray-900">{appointments.length}</div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
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
                              <div className="text-2xl font-semibold text-gray-900">2</div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {(userRole === "patient" || userRole === "dentist") && (
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
                                {upcomingAppointments.length > 0
                                  ? upcomingAppointments[0].date
                                  : "No upcoming appointments"}
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3">
                      <div className="text-sm">
                        <button
                          className="font-medium text-blue-600 hover:text-blue-500"
                          onClick={() => setCurrentView("book")}
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
              )}
            </div>
          </div>
        )}

        {/* Appointments List */}
        {currentView === "appointments" && (
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">My Appointments</h1>
              <button
                onClick={() => setCurrentView("book")}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
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
                              <button
                                onClick={() => cancelAppointment(appointment.id)}
                                className="text-red-600 hover:text-red-900 mr-4"
                              >
                                Cancel
                              </button>
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

        {/* Book Appointment */}
        {currentView === "book" && (
          <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h1 className="text-2xl font-semibold text-gray-900">Book an Appointment</h1>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Please fill in the details below to schedule your dental appointment.
                </p>
              </div>

              {bookingSuccess && (
                <div
                  className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mx-4 mb-4"
                  role="alert"
                >
                  <span className="block sm:inline">Appointment booked successfully!</span>
                </div>
              )}

              <form onSubmit={handleBookAppointment} className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                      Select Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                      Select Time *
                    </label>
                    <select
                      id="time"
                      name="time"
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    >
                      <option value="">-- Select a time slot --</option>
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="09:30 AM">09:30 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="10:30 AM">10:30 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="11:30 AM">11:30 AM</option>
                      <option value="01:00 PM">01:00 PM</option>
                      <option value="01:30 PM">01:30 PM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="02:30 PM">02:30 PM</option>
                      <option value="03:00 PM">03:00 PM</option>
                      <option value="03:30 PM">03:30 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                      <option value="04:30 PM">04:30 PM</option>
                    </select>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="dentist" className="block text-sm font-medium text-gray-700">
                      Select Dentist *
                    </label>
                    <select
                      id="dentist"
                      name="dentist"
                      value={bookingDentist}
                      onChange={(e) => setBookingDentist(e.target.value)}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    >
                      <option value="">-- Select a dentist --</option>
                      <option value="Dr. Sarah Smith">Dr. Sarah Smith (Orthodontist)</option>
                      <option value="Dr. Michael Johnson">Dr. Michael Johnson (Periodontist)</option>
                      <option value="Dr. Emily Davis">Dr. Emily Davis (General Dentist)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                      Appointment Type *
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={bookingType}
                      onChange={(e) => setBookingType(e.target.value)}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    >
                      <option value="Check-up">Check-up</option>
                      <option value="Cleaning">Cleaning</option>
                      <option value="Filling">Filling</option>
                      <option value="Extraction">Extraction</option>
                      <option value="Root Canal">Root Canal</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                      Notes (Optional)
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Please provide any additional information about your appointment..."
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Book Appointment
                  </button>
                </div>
              </form>
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

