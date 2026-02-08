const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

// Mock user database
const users = [
  { id: 1, email: 'user@example.com', password: 'pass123', role: 'user' },
  { id: 2, email: 'admin@example.com', password: 'admin123', role: 'admin' }
]

router.post('/login', (req, res) => {
  const { email, password } = req.body

  const user = users.find(u => u.email === email && u.password === password)
  if (!user) {
    return res.status(401).json({ message: 'Email ou mot de passe incorrect' })
  }

  // Générer le token avec id et role dans le payload
  const token = jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )

  res.json({ token })
})

module.exports = router
