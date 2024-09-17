// src/routes/atendeeRoutes.js
const express = require('express');
const router = express.Router();
const atendeeController = require('../controllers/atendeeController');
const authMiddleware = require('../middlewares/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Atendee:
 *       type: object
 *       required:
 *         - user_id
 *         - event_id
 *         - registration_date
 *       properties:
 *         user_id:
 *           type: string
 *           description: ID del usuario
 *         event_id:
 *           type: string
 *           description: ID del evento
 *         registration_date:
 *           type: string
 *           format: date
 *           description: Fecha de registro
 */

/**
 * @swagger
 * /api/atendee/create:
 *   post:
 *     summary: Registrar un nuevo asistente
 *     tags: [Asistentes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Atendee'
 *     responses:
 *       201:
 *         description: Asistente registrado
 */
router.post('/create', authMiddleware, atendeeController.createAtendee);

/**
 * @swagger
 * /api/atendee/getAll:
 *   get:
 *     summary: Obtener todos los asistentes
 *     tags: [Asistentes]
 *     responses:
 *       200:
 *         description: Lista de asistentes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Atendee'
 */
router.get('/getAll', atendeeController.getAllAtendee);

/**
 * @swagger
 * /api/atendee/update/{id}:
 *   put:
 *     summary: Actualizar un asistente por ID
 *     tags: [Asistentes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del asistente a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Atendee'
 *     responses:
 *       200:
 *         description: Asistente actualizado
 */
router.put('/update/:id', authMiddleware, atendeeController.updateAtendee);

/**
 * @swagger
 * /api/atendee/delete/{id}:
 *   delete:
 *     summary: Eliminar un asistente por ID
 *     tags: [Asistentes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del asistente a eliminar
 *     responses:
 *       204:
 *         description: Asistente eliminado
 */
router.delete('/delete/:id', authMiddleware, atendeeController.deleteAtendee);

module.exports = router;
