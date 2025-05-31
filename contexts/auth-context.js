"use client"

import { createContext, useState, useEffect } from "react"
import { mockApi } from "../lib/mock-data"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load user data on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = mockApi.getCurrentUser()
        setUser(userData)
      } catch (err) {
        console.error("Error loading user:", err)
        setError("Session expired. Please login again.")
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  // Register user
  const register = async (userData) => {
    try {
      setLoading(true)
      const res = await mockApi.register(userData)
      setUser(res.user)
      return true
    } catch (err) {
      setError(err.message || "Registration failed")
      return false
    } finally {
      setLoading(false)
    }
  }

  // Login user
  const login = async (email, password) => {
    try {
      setLoading(true)
      const res = await mockApi.login(email, password)
      setUser(res.user)
      return true
    } catch (err) {
      setError(err.message || "Login failed")
      return false
    } finally {
      setLoading(false)
    }
  }

  // Logout user
  const logout = () => {
    setUser(null)
  }

  // Clear error
  const clearError = () => {
    setError(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext

