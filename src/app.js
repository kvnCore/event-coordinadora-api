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

app.use(express.json());

app.use('/api', eventRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/attendee',atendeeRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

sequelize.sync()
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database connection failed:', err));

module.exports = app;
