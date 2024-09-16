
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const atendeeController = require('../controllers/atendeeController');

//Rutas para CRUD de eventos

router.post('/events/', eventController.createEvent);
router.get('/events/', eventController.getAllEvents);
router.get('/events/:id', eventController.getEventById);
router.put('/events/:id', eventController.updateEvent);
router.delete('/events/:id', eventController.deleteEvent);
router.post('/events/findNearSites', eventController.findNearSites);

//Rutas para CRUD de Asistentes

router.post('/atendee', atendeeController.createAtendee);
router.get('/atendee', atendeeController.getAllAtendee);
router.put('/atendee/:id', atendeeController.updateAtendee);
router.delete('/atendee/:id', atendeeController.deleteAtendee);

module.exports = router;
