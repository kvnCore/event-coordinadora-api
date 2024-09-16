// src/app.js
const express = require('express');
const dotenv = require('dotenv');
const eventRoutes = require('./routes/eventRoutes');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');

console.log("DB USER: ",process.env.DB_USER); 

dotenv.config();
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api', eventRoutes);
app.use('/api/auth', authRoutes);

// Manejo básico de errores
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

// Conectar a la base de datos
//console.log("sequelize",sequelize);
sequelize.sync()
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database connection failed:', err));

module.exports = app;
