// src/controllers/eventController.js
const Event = require('../models/eventModel');

exports.createEvent = async (req, res) => {
   try {
       const event = await Event.create(req.body);
       res.status(201).json(event);
   } catch (error) {
       res.status(500).json({ message: error.message });
   }
};

exports.getAllEvents = async (req, res) => {
   try {
       const events = await Event.findAll();
       res.status(200).json(events);
   } catch (error) {
       res.status(500).json({ message: error.message });
   }
};

// Similarmente, puedes agregar los demás métodos (getEventById, updateEvent, deleteEvent)
