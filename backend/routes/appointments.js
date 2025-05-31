const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const Appointment = require("../models/Appointment")
const User = require("../models/User")
const mongoose = require("mongoose") // Added missing mongoose import

// @route   GET api/appointments
// @desc    Get all appointments (filtered by role)
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    let appointments

    // Filter appointments based on user role
    if (req.user.role === "admin") {
      // Admins can see all appointments
      appointments = await Appointment.find()
        .populate("patient", "firstName lastName email")
        .populate("dentist", "firstName lastName")
        .sort({ date: 1 })
    } else if (req.user.role === "dentist") {
      // Dentists can see their own appointments
      appointments = await Appointment.find({ dentist: req.user.id })
        .populate("patient", "firstName lastName email")
        .sort({ date: 1 })
    } else {
      // Patients can see their own appointments
      appointments = await Appointment.find({ patient: req.user.id })
        .populate("dentist", "firstName lastName")
        .sort({ date: 1 })
    }

    res.json(appointments)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
})

// @route   POST api/appointments
// @desc    Create a new appointment
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    const { dentist, date, startTime, endTime, type, notes } = req.body

    // Check for conflicting appointments
    const conflictingAppointment = await Appointment.findOne({
      dentist,
      date: new Date(date),
      $or: [
        {
          startTime: { $lte: startTime },
          endTime: { $gt: startTime },
        },
        {
          startTime: { $lt: endTime },
          endTime: { $gte: endTime },
        },
        {
          startTime: { $gte: startTime },
          endTime: { $lte: endTime },
        },
      ],
      status: { $ne: "cancelled" },
    })

    if (conflictingAppointment) {
      return res.status(400).json({ message: "This time slot is already booked" })
    }

    // Create new appointment
    const newAppointment = new Appointment({
      patient: req.user.role === "patient" ? req.user.id : req.body.patient,
      dentist,
      date: new Date(date),
      startTime,
      endTime,
      type,
      notes,
      createdBy: req.user.id,
    })

    const appointment = await newAppointment.save()

    res.json(appointment)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
})

// @route   PUT api/appointments/:id
// @desc    Update an appointment
// @access  Private
router.put("/:id", auth, async (req, res) => {
  try {
    const { dentist, date, startTime, endTime, status, type, notes } = req.body

    // Find appointment
    let appointment = await Appointment.findById(req.params.id)

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" })
    }

    // Check if user is authorized to update
    if (req.user.role === "patient" && appointment.patient.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" })
    }

    if (req.user.role === "dentist" && appointment.dentist.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" })
    }

    // If changing date/time, check for conflicts
    if (
      (date && date !== appointment.date.toISOString().split("T")[0]) ||
      (startTime && startTime !== appointment.startTime) ||
      (endTime && endTime !== appointment.endTime)
    ) {
      const conflictingAppointment = await Appointment.findOne({
        _id: { $ne: req.params.id },
        dentist: dentist || appointment.dentist,
        date: new Date(date || appointment.date),
        $or: [
          {
            startTime: { $lte: startTime || appointment.startTime },
            endTime: { $gt: startTime || appointment.startTime },
          },
          {
            startTime: { $lt: endTime || appointment.endTime },
            endTime: { $gte: endTime || appointment.endTime },
          },
          {
            startTime: { $gte: startTime || appointment.startTime },
            endTime: { $lte: endTime || appointment.endTime },
          },
        ],
        status: { $ne: "cancelled" },
      })

      if (conflictingAppointment) {
        return res.status(400).json({ message: "This time slot is already booked" })
      }
    }

    // Update appointment
    appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          dentist: dentist || appointment.dentist,
          date: date ? new Date(date) : appointment.date,
          startTime: startTime || appointment.startTime,
          endTime: endTime || appointment.endTime,
          status: status || appointment.status,
          type: type || appointment.type,
          notes: notes || appointment.notes,
        },
      },
      { new: true },
    )

    res.json(appointment)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
})

// @route   DELETE api/appointments/:id
// @desc    Cancel an appointment
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" })
    }

    // Check if user is authorized to cancel
    if (req.user.role === "patient" && appointment.patient.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" })
    }

    // Instead of deleting, mark as cancelled
    appointment.status = "cancelled"
    await appointment.save()

    res.json({ message: "Appointment cancelled" })
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
})

// @route   GET api/appointments/availability/:dentistId/:date
// @desc    Check dentist availability for a specific date
// @access  Private
router.get("/availability/:dentistId/:date", auth, async (req, res) => {
  try {
    const { dentistId, date } = req.params

    // Get all appointments for the dentist on the specified date
    const appointments = await Appointment.find({
      dentist: dentistId,
      date: new Date(date),
      status: { $ne: "cancelled" },
    }).select("startTime endTime")

    // Get dentist's working hours
    const dentist = await User.findById(dentistId)
    if (!dentist) {
      return res.status(404).json({ message: "Dentist not found" })
    }

    // Get day of week from date
    const dayOfWeek = new Date(date).toLocaleDateString("en-US", { weekday: "long" }).toLowerCase()

    // Find dentist's availability for this day
    try {
      const Dentist = mongoose.model("Dentist")
      const dentistInfo = await Dentist.findOne({ user: dentistId })

      if (!dentistInfo) {
        return res.status(404).json({ message: "Dentist info not found" })
      }

      const dayAvailability = dentistInfo.availability.find((a) => a.day === dayOfWeek)

      if (!dayAvailability || !dayAvailability.isAvailable) {
        return res.json({ available: false, message: "Dentist not available on this day" })
      }

      // Return appointments and working hours
      res.json({
        available: true,
        workingHours: {
          start: dayAvailability.startTime,
          end: dayAvailability.endTime,
        },
        bookedSlots: appointments,
      })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: "Error fetching dentist availability" })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
})

module.exports = router

