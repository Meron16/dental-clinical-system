const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const { requireRole, requireSelfOrRole } = require("../middleware/roles")
const Patient = require("../models/Patient")

// GET /api/patients - admin only
router.get("/", auth, requireRole("admin"), async (req, res) => {
  try {
    const patients = await Patient.find().populate("user", "firstName lastName email")
    res.json(patients)
  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
})

// GET /api/patients/:id - self (via user id match) or admin
router.get("/:id", auth, requireSelfOrRole("admin"), async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate("user", "firstName lastName email")
    if (!patient) return res.status(404).json({ message: "Patient not found" })
    res.json(patient)
  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
})

// POST /api/patients - create profile (self or admin)
router.post("/", auth, async (req, res) => {
  try {
    const payload = { ...req.body }
    if (!payload.user) payload.user = req.user.id
    const patient = await Patient.create(payload)
    res.status(201).json(patient)
  } catch (err) {
    res.status(400).json({ message: "Invalid data" })
  }
})

// PUT /api/patients/:id - update (self or admin)
router.put("/:id", auth, requireSelfOrRole("admin"), async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    if (!patient) return res.status(404).json({ message: "Patient not found" })
    res.json(patient)
  } catch (err) {
    res.status(400).json({ message: "Invalid data" })
  }
})

module.exports = router


