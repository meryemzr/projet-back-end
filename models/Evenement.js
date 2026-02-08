const mongoose = require('mongoose');

const evenementSchema = new mongoose.Schema({
  nom: String,
  date: Date,
  lieu: String,
  genre: String
  
});

module.exports = mongoose.model('Evenement', evenementSchema);
