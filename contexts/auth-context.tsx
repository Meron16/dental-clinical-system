"use client"

import { createContext, useState, type ReactNode } from "react"

// Define user types
type UserRole = "admin" | "dentist" | "patient"

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: UserRole
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string, setCurrentPage: (page: string) => void) => void
  register: (userData: any, setCurrentPage: (page: string) => void) => void
  logout: () => void
  clearError: () => void
}

// Mock users for demo
const mockUsers = [
  {
    id: "1",
    firstName: "Admin",
    lastName: "User",
    email: "admin@example.com",
    password: "password",
    role: "admin" as UserRole,
  },
  {
    id: "2",
    firstName: "John",
    lastName: "Doe",
    email: "patient@example.com",
    password: "password",
    role: "patient" as UserRole,
  },
  {
    id: "3",
    firstName: "Sarah",
    lastName: "Smith",
    email: "dentist@example.com",
    password: "password",
    role: "dentist" as UserRole,
  },
]

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: null,
  login: () => {},
  register: () => {},
  logout: () => {},
  clearError: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Login function
  const login = (email: string, password: string, setCurrentPage: (page: string) => void) => {
    setLoading(true)
    setError(null)

    // Simulate API call
    setTimeout(() => {
      const user = mockUsers.find((u) => u.email === email && u.password === password)

      if (user) {
        const { password, ...userWithoutPassword } = user
        setUser(userWithoutPassword)
        setCurrentPage("dashboard")
      } else {
        setError("Invalid email or password")
      }
      setLoading(false)
    }, 500)
  }

  // Register function
  const register = (userData: any, setCurrentPage: (page: string) => void) => {
    setLoading(true)
    setError(null)

    // Simulate API call
    setTimeout(() => {
      // Check if user already exists
      if (mockUsers.some((u) => u.email === userData.email)) {
        setError("User already exists")
      } else {
        // In a real app, we would save the user to the database
        // For demo, we'll just log in as a patient
        const newUser = {
          id: "4",
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          role: "patient" as UserRole,
        }

        setUser(newUser)
        setCurrentPage("dashboard")
      }
      setLoading(false)
    }, 500)
  }

  // Logout function
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
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext

