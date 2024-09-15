// src/controllers/eventController.js
const Event = require('../models/eventModel');
const connection = require('../config/database');

exports.getAllEvents = (req, res) => {
    const query = squel.select()
    .from('event')
    .order('date', false)  // false indica orden descendente (más próximo al más cercano)
    .toString();

    // Ejecutar la consulta
    connection.query(query, (error, results) => {
        if (error) {
        return callback(error, null);
        }
        callback(null, results);
    });
};

exports.getEventById = (req, res) => {
    // Lógica para obtener un evento específico
};

exports.createEvent = (req, res) => {
    // Lógica para crear un evento
};

exports.updateEvent = (req, res) => {
    // Lógica para actualizar un evento
};

exports.deleteEvent = (req, res) => {
    // Lógica para eliminar un evento
};

// Similarmente, puedes agregar los demás métodos (getEventById, updateEvent, deleteEvent)
