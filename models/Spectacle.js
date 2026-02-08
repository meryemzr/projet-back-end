const mongoose = require('mongoose');

const spectacleSchema = new mongoose.Schema({
  titre: String,
  lieu : String,
  date: Date,
  synopsis: String,
  visuel: String,
  distribution: [String],
  ficheTechnique: String,
  videoLien: String,
  dossierpresse: String,
  dateCreation: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Spectacle', spectacleSchema);
