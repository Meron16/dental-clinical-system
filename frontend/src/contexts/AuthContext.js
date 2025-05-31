"use client"

import { createContext, useState, useEffect } from "react"
import api from "../services/api"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load user data if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          api.defaults.headers.common["x-auth-token"] = token
          const res = await api.get("/api/auth/me")
          setUser(res.data)
        } catch (err) {
          console.error("Error loading user:", err)
          localStorage.removeItem("token")
          setToken(null)
          setError("Session expired. Please login again.")
        }
      }
      setLoading(false)
    }

    loadUser()
  }, [token])

  // Register user
  const register = async (userData) => {
    try {
      setLoading(true)
      const res = await api.post("/api/auth/register", userData)
      localStorage.setItem("token", res.data.token)
      setToken(res.data.token)
      return true
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed")
      return false
    } finally {
      setLoading(false)
    }
  }

  // Login user
  const login = async (email, password) => {
    try {
      setLoading(true)
      const res = await api.post("/api/auth/login", { email, password })
      localStorage.setItem("token", res.data.token)
      setToken(res.data.token)
      return true
    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
      return false
    } finally {
      setLoading(false)
    }
  }

  // Logout user
  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
    delete api.defaults.headers.common["x-auth-token"]
  }

  // Clear error
  const clearError = () => {
    setError(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
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

