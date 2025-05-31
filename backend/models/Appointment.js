const mongoose = require("mongoose")

const AppointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dentist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String, // Format: "HH:MM"
      required: true,
    },
    endTime: {
      type: String, // Format: "HH:MM"
      required: true,
    },
    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled", "no-show"],
      default: "scheduled",
    },
    type: {
      type: String,
      enum: ["check-up", "cleaning", "filling", "extraction", "root-canal", "other"],
      required: true,
    },
    notes: {
      type: String,
    },
    followUp: {
      required: Boolean,
      date: Date,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model("Appointment", AppointmentSchema)

