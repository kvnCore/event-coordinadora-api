
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const atendeeController = require('../controllers/atendeeController');

//Rutas para CRUD de eventos

router.post('/events/create', eventController.createEvent);
router.get('/events/getall', eventController.getAllEvents);
router.get('/events/getbyid/:id', eventController.getEventById);
router.put('/events/update/:id', eventController.updateEvent);
router.delete('/events/delete/:id', eventController.deleteEvent);
router.post('/events/findNearSites', eventController.findNearSites);
router.get('/events/attendanceByDay', eventController.getAttendanceByDay);


//Rutas para CRUD de Asistentes

router.post('/atendee', atendeeController.createAtendee);
router.get('/atendee', atendeeController.getAllAtendee);
router.put('/atendee/:id', atendeeController.updateAtendee);
router.delete('/atendee/:id', atendeeController.deleteAtendee);

module.exports = router;
