const express = require('express');
const router = express.Router();
const Evenement = require('../models/Evenement');

// ✅ Ajouter un événement
router.post('/', async (req, res) => {
  try {
    const evt = new Evenement(req.body);
    await evt.save();
    res.status(201).json({
      id: evt._id.toString(),
      nom: evt.nom,
      date: evt.date,
      lieu: evt.lieu,
      genre: evt.genre
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Lister les événements (avec champ `id`)
router.get('/', async (req, res) => {
  try {
    const events = await Evenement.find().sort({ date: 1 });
    const transformed = events.map(e => ({
      id: e._id.toString(),
      nom: e.nom,
      date: e.date,
      lieu: e.lieu,
      genre: e.genre
    }));
    res.json(transformed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Supprimer un événement par ID
router.delete('/:id', async (req, res) => {
  try {
    await Evenement.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Événement supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Modifier un événement par ID
router.put('/:id', async (req, res) => {
  try {
    const eventUpdated = await Evenement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({
      id: eventUpdated._id.toString(),
      nom: eventUpdated.nom,
      date: eventUpdated.date,
      lieu: eventUpdated.lieu,
      genre: eventUpdated.genre
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
