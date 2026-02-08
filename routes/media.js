const express = require('express');
const router = express.Router();
const Media = require('../models/Media');

// Ajouter un média
router.post('/', async (req, res) => {
  try {
    const media = new Media(req.body);
    await media.save();
    res.status(201).json(media);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Liste des médias
router.get('/', async (req, res) => {
  try {
    const medias = await Media.find().sort({ dateAjout: -1 });
    res.json(medias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// 🔁 Modifier un média
router.put('/:id', async (req, res) => {
  try {
    const updatedMedia = await Media.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // retourne le média modifié
    );
    if (!updatedMedia) {
      return res.status(404).json({ message: 'Média non trouvé' });
    }
    res.json(updatedMedia);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ Supprimer un média
router.delete('/:id', async (req, res) => {
  try {
    const deletedMedia = await Media.findByIdAndDelete(req.params.id);
    if (!deletedMedia) {
      return res.status(404).json({ message: 'Média non trouvé' });
    }
    res.json({ message: 'Média supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
