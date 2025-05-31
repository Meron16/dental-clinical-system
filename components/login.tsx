"use client"

import type React from "react"

import { useState, useContext } from "react"
import AuthContext from "@/contexts/auth-context"

export default function Login({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const { login, error, clearError, loading } = useContext(AuthContext)

  const { email, password } = formData

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    // Clear field error when user starts typing
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: "" })
    }
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}
    if (!email) errors.email = "Email is required"
    if (!password) errors.password = "Password is required"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    clearError()

    if (validateForm()) {
      login(email, password, setCurrentPage)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
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
                value={email}
                onChange={onChange}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  formErrors.email ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Email address"
              />
              {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
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
                value={password}
                onChange={onChange}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  formErrors.password ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Password"
              />
              {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
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
  )
}

