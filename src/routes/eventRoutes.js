
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const upload = require('../middlewares/uploads');
const authMiddleware = require('../middlewares/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - date
 *         - location
 *         - organizerId
 *       properties:
 *         title:
 *           type: string
 *           description: Título del evento
 *         description:
 *           type: string
 *           description: Descripción del evento
 *         date:
 *           type: string
 *           format: date
 *           description: Fecha del evento
 *         location:
 *           type: string
 *           description: Ubicación del evento
 *         organizerId:
 *           type: integer
 *           description: ID del organizador
 */

/**
 * @swagger
 * /api/events/create:
 *   post:
 *     summary: Crear un nuevo evento
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: El evento ha sido creado
 */
router.post('/events/create', authMiddleware, eventController.createEvent);

/**
 * @swagger
 * /api/events/getall:
 *   get:
 *     summary: Obtener todos los eventos
 *     tags: [Eventos]
 *     responses:
 *       200:
 *         description: Lista de eventos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 */
router.get('/events/getall', eventController.getAllEvents);

/**
 * @swagger
 * /api/events/getbyid/{id}:
 *   get:
 *     summary: Obtener un evento por ID
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del evento
 *     responses:
 *       200:
 *         description: Detalles del evento
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 */
router.get('/events/getbyid/:id', eventController.getEventById);

/**
 * @swagger
 * /api/events/update/{id}:
 *   put:
 *     summary: Actualizar un evento por ID
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del evento a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Evento actualizado
 */
router.put('/events/update/:id', authMiddleware, eventController.updateEvent);

/**
 * @swagger
 * /api/events/delete/{id}:
 *   delete:
 *     summary: Eliminar un evento por ID
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del evento a eliminar
 *     responses:
 *       204:
 *         description: El evento ha sido eliminado
 */
router.delete('/events/delete/:id', authMiddleware, eventController.deleteEvent);

/**
 * @swagger
 * /api/events/findNearSites:
 *   post:
 *     summary: Buscar sitios cercanos a un evento (Esta api se puede usar de forma individual o ya viene complementada con traer los eventos)
 *     tags: [Eventos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location:
 *                 type: string
 *                 description: Ubicación del evento
 *     responses:
 *       200:
 *         description: Lista de sitios cercanos
 */
router.post('/events/findNearSites', eventController.findNearSites);

/**
 * @swagger
 * /api/events/attendanceByDay:
 *   get:
 *     summary: Obtener asistencia por día de la semana
 *     tags: [Eventos]
 *     responses:
 *       200:
 *         description: Cantidad de asistentes por día
 */
router.get('/events/attendanceByDay', eventController.getAttendanceByDay);

/**
 * @swagger
 * /api/events/upload:
 *   post:
 *     summary: Cargar eventos desde un archivo Excel
 *     tags: [Eventos]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Archivo Excel con los eventos
 *     responses:
 *       200:
 *         description: Eventos cargados exitosamente
 */
router.post('/events/upload', upload.single('file'), eventController.uploadEventsFromExcel);

module.exports = router;

