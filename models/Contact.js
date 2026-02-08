const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  nom: String,
  email: String,
  sujet: String,
  message: String,
  dateEnvoi: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contact', contactSchema);
