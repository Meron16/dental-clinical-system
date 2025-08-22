module.exports.requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        return res.status(401).json({ message: "Unauthorized" })
      }
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: "Forbidden" })
      }
      next()
    } catch (err) {
      return res.status(500).json({ message: "Server error" })
    }
  }
}

module.exports.requireSelfOrRole = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) return res.status(401).json({ message: "Unauthorized" })
      if (req.params.id && req.user.id === req.params.id) return next()
      if (allowedRoles.includes(req.user.role)) return next()
      return res.status(403).json({ message: "Forbidden" })
    } catch (_) {
      return res.status(500).json({ message: "Server error" })
    }
  }
}


