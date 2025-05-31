"use client"

export default function Navbar({ loggedIn, userRole, onLogout, setCurrentPage }) {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <button onClick={() => setCurrentPage("home")} className="text-2xl font-bold text-blue-600">
                DentalCare
              </button>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <button
                onClick={() => setCurrentPage("home")}
                className="border-transparent text-gray-500 hover:border-blue-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </button>
              {loggedIn && (
                <button
                  onClick={() => setCurrentPage("appointments")}
                  className="border-transparent text-gray-500 hover:border-blue-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  My Appointments
                </button>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {loggedIn ? (
              <div className="flex items-center space-x-4">
                {userRole === "admin" && (
                  <button
                    onClick={() => setCurrentPage("dashboard")}
                    className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Admin Dashboard
                  </button>
                )}
                <button
                  onClick={() => setCurrentPage("book-appointment")}
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Book Appointment
                </button>
                <div className="relative">
                  <div className="flex items-center">
                    <span className="text-gray-700 mr-2">
                      {userRole === "admin" ? "Admin" : userRole === "dentist" ? "Dr. Smith" : "John"}
                    </span>
                    <button
                      type="button"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                      onClick={onLogout}
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
                <button
                  onClick={() => setCurrentPage("register")}
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
  )
}

