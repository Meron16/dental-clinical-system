const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const { requireRole } = require("../middleware/roles")
const Dentist = require("../models/Dentist")

// GET /api/dentists - public list (basic)
router.get("/", async (req, res) => {
  try {
    const dentists = await Dentist.find().populate("user", "firstName lastName email")
    res.json(dentists)
  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
})

// GET /api/dentists/:id
router.get("/:id", async (req, res) => {
  try {
    const dentist = await Dentist.findById(req.params.id).populate("user", "firstName lastName email")
    if (!dentist) return res.status(404).json({ message: "Dentist not found" })
    res.json(dentist)
  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
})

// POST /api/dentists - admin create
router.post("/", auth, requireRole("admin"), async (req, res) => {
  try {
    const dentist = await Dentist.create(req.body)
    res.status(201).json(dentist)
  } catch (err) {
    res.status(400).json({ message: "Invalid data" })
  }
})

// PUT /api/dentists/:id - admin update
router.put("/:id", auth, requireRole("admin"), async (req, res) => {
  try {
    const dentist = await Dentist.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    if (!dentist) return res.status(404).json({ message: "Dentist not found" })
    res.json(dentist)
  } catch (err) {
    res.status(400).json({ message: "Invalid data" })
  }
})

module.exports = router


