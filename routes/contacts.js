const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Envoyer un message
router.post('/', async (req, res) => {
  try {
    const msg = new Contact(req.body);
    await msg.save();
    res.status(201).json({ success: true, message: 'Message reçu' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// Récupérer tous les messages (GET)
router.get('/', async (req, res) => {
  console.log('Route GET /api/contact appelée');
  try {
    const messages = await Contact.find().sort({ dateEnvoi: -1 }); // du plus récent au plus ancien
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
