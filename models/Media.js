const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  type: { type: String, enum: ['photo', 'video', 'document'] },
  titre: String,
  url: String,
  description: String,
  dateAjout: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Media', mediaSchema);
