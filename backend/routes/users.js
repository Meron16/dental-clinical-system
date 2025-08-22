const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const { requireRole, requireSelfOrRole } = require("../middleware/roles")
const User = require("../models/User")

// GET /api/users - admin list users
router.get("/", auth, requireRole("admin"), async (req, res) => {
  try {
    const users = await User.find().select("-password")
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
})

// GET /api/users/:id - self or admin
router.get("/:id", auth, requireSelfOrRole("admin"), async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password")
    if (!user) return res.status(404).json({ message: "User not found" })
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
})

// PUT /api/users/:id - self or admin
router.put("/:id", auth, requireSelfOrRole("admin"), async (req, res) => {
  try {
    const allowed = ["firstName", "lastName", "phone", "profileImage"]
    const updates = {}
    for (const key of allowed) if (key in req.body) updates[key] = req.body[key]
    const user = await User.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true }).select("-password")
    if (!user) return res.status(404).json({ message: "User not found" })
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
})

// DELETE /api/users/:id - admin only
router.delete("/:id", auth, requireRole("admin"), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).json({ message: "User not found" })
    res.json({ message: "User deleted" })
  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router


