const mongoose = require("mongoose")

const PatientSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    emergencyContact: {
      name: String,
      relationship: String,
      phone: String,
    },
    medicalHistory: {
      allergies: [String],
      medications: [String],
      conditions: [String],
      surgeries: [String],
      notes: String,
    },
    dentalHistory: {
      lastVisit: Date,
      treatments: [
        {
          type: String,
          date: Date,
          description: String,
          dentist: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        },
      ],
      notes: String,
    },
    insuranceInfo: {
      provider: String,
      policyNumber: String,
      groupNumber: String,
      coverageDetails: String,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model("Patient", PatientSchema)

