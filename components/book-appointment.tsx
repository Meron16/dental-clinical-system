"use client"

import type React from "react"

import { useState } from "react"

export default function BookAppointment({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    dentist: "",
    type: "Check-up",
    notes: "",
  })
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, we would send this data to the API
    console.log("Booking appointment:", formData)

    // Show success message
    setSuccess(true)

    // Reset form
    setFormData({
      date: "",
      time: "",
      dentist: "",
      type: "Check-up",
      notes: "",
    })

    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccess(false)
      setCurrentPage("appointments")
    }, 3000)
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h1 className="text-2xl font-semibold text-gray-900">Book an Appointment</h1>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Please fill in the details below to schedule your dental appointment.
          </p>
        </div>

        {success && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mx-4 mb-4"
            role="alert"
          >
            <span className="block sm:inline">Appointment booked successfully!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Select Date *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
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
                value={formData.time}
                onChange={handleChange}
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
                value={formData.dentist}
                onChange={handleChange}
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
                value={formData.type}
                onChange={handleChange}
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
                value={formData.notes}
                onChange={handleChange}
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
  )
}

