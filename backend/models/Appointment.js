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
      type: new mongoose.Schema(
        {
          required: { type: Boolean, default: false },
          date: { type: Date },
        },
        { _id: false },
      ),
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model("Appointment", AppointmentSchema)

