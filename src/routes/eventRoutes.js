
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const atendeeController = require('../controllers/atendeeController');
const upload = require('../middlewares/uploads');
const authMiddleware = require('../middlewares/auth');

//Rutas para CRUD de eventos

router.post('/events/create', authMiddleware,eventController.createEvent);
router.get('/events/getall', eventController.getAllEvents);
router.get('/events/getbyid/:id', eventController.getEventById);
router.put('/events/update/:id', authMiddleware,eventController.updateEvent);
router.delete('/events/delete/:id', authMiddleware,eventController.deleteEvent);
router.post('/events/findNearSites', eventController.findNearSites);
router.get('/events/attendanceByDay', eventController.getAttendanceByDay);
router.post('/events/upload', upload.single('file'), eventController.uploadEventsFromExcel);


//Rutas para CRUD de Asistentes

router.post('/atendee/create', authMiddleware,atendeeController.createAtendee);
router.get('/atendee/getAll', atendeeController.getAllAtendee);
router.put('/atendee/update/:id', authMiddleware,atendeeController.updateAtendee); 
router.delete('/atendee/delete/:id', authMiddleware,atendeeController.deleteAtendee);
 
module.exports = router;
