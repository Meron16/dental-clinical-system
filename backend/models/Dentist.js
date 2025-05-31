const mongoose = require("mongoose")

const DentistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    qualifications: [
      {
        degree: String,
        institution: String,
        year: Number,
      },
    ],
    experience: {
      type: Number, // Years of experience
      required: true,
    },
    availability: [
      {
        day: {
          type: String,
          enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
        },
        startTime: String, // Format: "HH:MM"
        endTime: String, // Format: "HH:MM"
        isAvailable: {
          type: Boolean,
          default: true,
        },
      },
    ],
    bio: String,
    services: [String],
  },
  { timestamps: true },
)

module.exports = mongoose.model("Dentist", DentistSchema)

