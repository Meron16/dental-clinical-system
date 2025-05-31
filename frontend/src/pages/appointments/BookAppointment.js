"use client"

import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import api from "../../services/api"
import AuthContext from "../../contexts/AuthContext"

const BookAppointment = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const [dentists, setDentists] = useState([])
  const [selectedDentist, setSelectedDentist] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [availableSlots, setAvailableSlots] = useState([])
  const [selectedSlot, setSelectedSlot] = useState("")
  const [appointmentType, setAppointmentType] = useState("check-up")
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Appointment types
  const appointmentTypes = [
    { value: "check-up", label: "Check-up" },
    { value: "cleaning", label: "Cleaning" },
    { value: "filling", label: "Filling" },
    { value: "extraction", label: "Extraction" },
    { value: "root-canal", label: "Root Canal" },
    { value: "other", label: "Other" },
  ]

  // Fetch dentists on component mount
  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const res = await api.get("/api/dentists")
        setDentists(res.data)
      } catch (err) {
        setError("Failed to fetch dentists. Please try again.")
        console.error(err)
      }
    }

    fetchDentists()
  }, [])

  // Check availability when dentist or date changes
  useEffect(() => {
    if (selectedDentist && selectedDate) {
      checkAvailability()
    }
  }, [selectedDentist, selectedDate])

  const checkAvailability = async () => {
    try {
      setLoading(true)
      setError("")

      const formattedDate = selectedDate.toISOString().split("T")[0]
      const res = await api.get(`/api/appointments/availability/${selectedDentist}/${formattedDate}`)

      if (!res.data.available) {
        setAvailableSlots([])
        setError(res.data.message || "No available slots for this date.")
        return
      }

      // Generate time slots based on working hours and booked appointments
      const { workingHours, bookedSlots } = res.data
      const slots = generateTimeSlots(workingHours.start, workingHours.end, bookedSlots)
      setAvailableSlots(slots)

      if (slots.length === 0) {
        setError("No available slots for this date.")
      }
    } catch (err) {
      setError("Failed to check availability. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Generate 30-minute time slots between start and end times, excluding booked slots
  const generateTimeSlots = (startTime, endTime, bookedSlots) => {
    const slots = []
    const [startHour, startMinute] = startTime.split(":").map(Number)
    const [endHour, endMinute] = endTime.split(":").map(Number)

    let currentHour = startHour
    let currentMinute = startMinute

    while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
      const timeString = `${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`

      // Check if this slot is already booked
      const isBooked = bookedSlots.some((slot) => {
        return timeString >= slot.startTime && timeString < slot.endTime
      })

      if (!isBooked) {
        // Calculate end time (30 minutes later)
        let endHour = currentHour
        let endMinute = currentMinute + 30

        if (endMinute >= 60) {
          endHour += 1
          endMinute -= 60
        }

        const endTimeString = `${endHour.toString().padStart(2, "0")}:${endMinute.toString().padStart(2, "0")}`

        // Only add if end time is within working hours
        if (endHour < endHour || (endHour === endHour && endMinute <= endMinute)) {
          slots.push({
            startTime: timeString,
            endTime: endTimeString,
            label: `${timeString} - ${endTimeString}`,
          })
        }
      }

      // Move to next 30-minute slot
      currentMinute += 30
      if (currentMinute >= 60) {
        currentHour += 1
        currentMinute -= 60
      }
    }

    return slots
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedDentist || !selectedDate || !selectedSlot || !appointmentType) {
      setError("Please fill in all required fields.")
      return
    }

    try {
      setLoading(true)
      setError("")

      const slot = availableSlots.find((slot) => slot.startTime === selectedSlot)
      if (!slot) {
        setError("Invalid time slot selected.")
        return
      }

      const appointmentData = {
        dentist: selectedDentist,
        date: selectedDate.toISOString().split("T")[0],
        startTime: slot.startTime,
        endTime: slot.endTime,
        type: appointmentType,
        notes,
      }

      await api.post("/api/appointments", appointmentData)

      setSuccess("Appointment booked successfully!")
      setTimeout(() => {
        navigate("/appointments")
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to book appointment. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Filter out past dates
  const filterPastDates = (date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date >= today
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

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mx-4 mb-4"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {success && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mx-4 mb-4"
            role="alert"
          >
            <span className="block sm:inline">{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="dentist" className="block text-sm font-medium text-gray-700">
                Select Dentist *
              </label>
              <select
                id="dentist"
                name="dentist"
                value={selectedDentist}
                onChange={(e) => setSelectedDentist(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              >
                <option value="">-- Select a dentist --</option>
                {dentists.map((dentist) => (
                  <option key={dentist._id} value={dentist._id}>
                    Dr. {dentist.user.firstName} {dentist.user.lastName} ({dentist.specialization})
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Select Date *
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                filterDate={filterPastDates}
                minDate={new Date()}
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
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
                disabled={availableSlots.length === 0}
              >
                <option value="">-- Select a time slot --</option>
                {availableSlots.map((slot, index) => (
                  <option key={index} value={slot.startTime}>
                    {slot.label}
                  </option>
                ))}
              </select>
              {availableSlots.length === 0 && selectedDentist && !loading && (
                <p className="mt-1 text-sm text-gray-500">
                  No available slots for this date. Please select another date.
                </p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Appointment Type *
              </label>
              <select
                id="type"
                name="type"
                value={appointmentType}
                onChange={(e) => setAppointmentType(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              >
                {appointmentTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
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
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Please provide any additional information about your appointment..."
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={loading || availableSlots.length === 0}
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Book Appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BookAppointment

