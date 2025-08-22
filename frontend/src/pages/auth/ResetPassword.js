import React from "react"
import { useParams } from "react-router-dom"

export default function ResetPassword() {
  const { token } = useParams()
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Reset Password</h1>
      <p className="text-gray-600">Token: {token}</p>
    </div>
  )
}


