const express = require('express');
const router = express.Router();
const Spectacle = require('../models/Spectacle');

// Obtenir tous les spectacles
router.get('/', async (req, res) => {
  const spectacles = await Spectacle.find();
  res.json(spectacles);
});

// Ajouter un spectacle
router.post('/', async (req, res) => {
  const spectacle = new Spectacle(req.body);
  await spectacle.save();
  res.status(201).json(spectacle);
});
// 🔁 Modifier un spectacle (PUT)
router.put('/:id', async (req, res) => {
  try {
    const updatedSpectacle = await Spectacle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // retourne le spectacle modifié
    );
    if (!updatedSpectacle) {
      return res.status(404).json({ message: 'Spectacle non trouvé' });
    }
    res.json(updatedSpectacle);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ❌ Supprimer un spectacle (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const deletedSpectacle = await Spectacle.findByIdAndDelete(req.params.id);
    if (!deletedSpectacle) {
      return res.status(404).json({ message: 'Spectacle non trouvé' });
    }
    res.json({ message: 'Spectacle supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
