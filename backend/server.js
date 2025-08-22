const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const path = require("path")

// Load environment variables (root and backend/.env)
dotenv.config()
dotenv.config({ path: path.join(__dirname, ".env") })

// Initialize Express app
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI

if (!MONGODB_URI) {
  console.error(
    "Missing MONGODB_URI. Set it in a .env file at project root or backend/.env (e.g., MONGODB_URI=mongodb://127.0.0.1:27017/dental_clinic)",
  )
  process.exit(1)
}

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err)
    process.exit(1)
  })

// API Routes
app.use("/api/auth", require("./routes/auth"))
app.use("/api/users", require("./routes/users"))
app.use("/api/patients", require("./routes/patients"))
app.use("/api/dentists", require("./routes/dentists"))
app.use("/api/appointments", require("./routes/appointments"))

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"))
  })
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: "Server error", error: process.env.NODE_ENV === "development" ? err.message : {} })
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

module.exports = app

