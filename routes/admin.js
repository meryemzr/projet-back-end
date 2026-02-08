// routes/admin.js
const express = require('express')
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware')
const bcrypt = require('bcryptjs')
const Admin = require('../models/Admin.js')
const router = express.Router()

// Exemple de route accessible uniquement aux admins
router.get('/dashboard', verifyToken, verifyAdmin, (req, res) => {
  res.json({
    message: `Bienvenue dans le back-office, utilisateur ID: ${req.user.id}`,
    user: req.user
  })
})

// Exemple : Voir tous les utilisateurs (mock)
router.get('/users', verifyToken, verifyAdmin, (req, res) => {
  // Ici, récupérer les utilisateurs depuis ta base de données
  res.json([
    { id: 1, email: 'user@example.com', role: 'user' },
    { id: 2, email: 'admin@example.com', role: 'admin' }
  ])
})
// Ajouter un nouvel admin (protégé par token + admin)
router.post('/ajout-admin', verifyToken, verifyAdmin, async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email et mot de passe sont requis' })
  }

  try {
    // Vérifier si l'admin existe déjà
    const existingAdmin = await Admin.findOne({ email })
    if (existingAdmin) {
      return res.status(400).json({ message: 'Cet admin existe déjà' })
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10)

    // Créer et sauvegarder le nouvel admin
    const newAdmin = new Admin({
      email,
      password: hashedPassword,
      role: 'admin'
    })

    await newAdmin.save()

    res.status(201).json({ message: 'Nouvel admin créé avec succès' })
  } catch (error) {
    console.error('Erreur création admin:', error)
    res.status(500).json({ message: 'Erreur serveur lors de la création de l\'admin' })
  }
})

module.exports = router
