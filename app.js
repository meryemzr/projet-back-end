
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());

// Middleware
app.use(cors());
app.use(express.json());
app.use('/media', express.static(path.resolve('C:/Users/mzira/Desktop/projet fin d\'etude/photo et video')));

console.log('Static media route active');
const spectacleRoutes = require('./routes/spectacles');
app.use('/api/spectacles', spectacleRoutes);
const evenementRoutes = require('./routes/evenements');
app.use('/api/evenements', evenementRoutes);
const contactRoutes = require('./routes/contacts');
app.use('/api/contacts', contactRoutes);
const mediaRoutes = require('./routes/media');
app.use('/api/media', mediaRoutes);
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);







// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connecté'))
.catch(err => console.error('Erreur MongoDB:', err));

// Routes de test
app.get('/', (req, res) => {
  res.send('Bienvenue sur le back-end de DIEM ÉVENTS');
});

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
