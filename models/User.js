const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // le mot de passe doit être hashé
});

module.exports = mongoose.model('User', userSchema);
