"use client"

import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, AuthContext } from "./contexts/AuthContext"

// Layout Components
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"

// Auth Pages
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import ForgotPassword from "./pages/auth/ForgotPassword"
import ResetPassword from "./pages/auth/ResetPassword"

// Public Pages
import Home from "./pages/Home"
import Services from "./pages/Services"
import Dentists from "./pages/Dentists"
import Contact from "./pages/Contact"

// Patient Pages
import Dashboard from "./pages/patient/Dashboard"
import Profile from "./pages/patient/Profile"
import MedicalHistory from "./pages/patient/MedicalHistory"

// Appointment Pages
import AppointmentList from "./pages/appointments/AppointmentList"
import BookAppointment from "./pages/appointments/BookAppointment"
import AppointmentDetails from "./pages/appointments/AppointmentDetails"

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard"
import AdminPatients from "./pages/admin/Patients"
import AdminDentists from "./pages/admin/Dentists"
import AdminAppointments from "./pages/admin/Appointments"

// Dentist Pages
import DentistDashboard from "./pages/dentist/Dashboard"
import DentistSchedule from "./pages/dentist/Schedule"
import DentistPatients from "./pages/dentist/Patients"

// Protected Route Component
const ProtectedRoute = ({ element, allowedRoles }) => {
  const { user, loading } = React.useContext(AuthContext)

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />
  }

  return element
}

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/dentists" element={<Dentists />} />
              <Route path="/contact" element={<Contact />} />

              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />

              {/* Patient Routes */}
              <Route
                path="/dashboard"
                element={<ProtectedRoute element={<Dashboard />} allowedRoles={["patient"]} />}
              />
              <Route
                path="/profile"
                element={<ProtectedRoute element={<Profile />} allowedRoles={["patient", "dentist", "admin"]} />}
              />
              <Route
                path="/medical-history"
                element={<ProtectedRoute element={<MedicalHistory />} allowedRoles={["patient"]} />}
              />

              {/* Appointment Routes */}
              <Route
                path="/appointments"
                element={
                  <ProtectedRoute element={<AppointmentList />} allowedRoles={["patient", "dentist", "admin"]} />
                }
              />
              <Route
                path="/appointments/book"
                element={<ProtectedRoute element={<BookAppointment />} allowedRoles={["patient", "admin"]} />}
              />
              <Route
                path="/appointments/:id"
                element={
                  <ProtectedRoute element={<AppointmentDetails />} allowedRoles={["patient", "dentist", "admin"]} />
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={<ProtectedRoute element={<AdminDashboard />} allowedRoles={["admin"]} />}
              />
              <Route
                path="/admin/patients"
                element={<ProtectedRoute element={<AdminPatients />} allowedRoles={["admin"]} />}
              />
              <Route
                path="/admin/dentists"
                element={<ProtectedRoute element={<AdminDentists />} allowedRoles={["admin"]} />}
              />
              <Route
                path="/admin/appointments"
                element={<ProtectedRoute element={<AdminAppointments />} allowedRoles={["admin"]} />}
              />

              {/* Dentist Routes */}
              <Route
                path="/dentist/dashboard"
                element={<ProtectedRoute element={<DentistDashboard />} allowedRoles={["dentist"]} />}
              />
              <Route
                path="/dentist/schedule"
                element={<ProtectedRoute element={<DentistSchedule />} allowedRoles={["dentist"]} />}
              />
              <Route
                path="/dentist/patients"
                element={<ProtectedRoute element={<DentistPatients />} allowedRoles={["dentist"]} />}
              />

              {/* Fallback Route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

