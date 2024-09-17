// src/app.js
const express = require('express');
const dotenv = require('dotenv');
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');
const atendeeRoutes = require('./routes/atendeeRoutes');
const sequelize = require('./config/database');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger/swaggerOptions');

dotenv.config();
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api', eventRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/attendee',atendeeRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
