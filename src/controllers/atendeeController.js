// src/controllers/atendeeController.js
const Atendee = require('../models/atendeeModel');
const connection = require('../config/database');

exports.getAllAtendee = async (req, res) => {
    try {
        
        const Atendees = await Atendee.findAll({
            //include: ['organizer']  
        });

        res.status(200).json(Atendees);
    } catch (error) {
        res.status(500).json({ message: error.message });  
    }
};

exports.updateAtendee = async (req, res) => {
    try {
        const { id } = req.params;  
        const { date } = req.body;  

        
        const Atendee = await Atendee.findByPk(id);

        if (!Atendee) {
            return res.status(404).json({ message: 'Asistente no encontrado' });
        }

        
        Atendee.registation_date = date || Atendee.registation_date;

        
        await Atendee.save();

        res.status(200).json(Atendee);  
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createAtendee = async (req, res) => {
    try {
        const { user_id, atendee_id, registration_date } = req.body;

       
        const newAtendee = await Atendee.create({
            user_id,
            atendee_id,
            registration_date,
            
        });

        
        res.status(201).json(newAtendee);
    } catch (error) {
        res.status(500).json({ message: error.message });  
    }
};


exports.deleteAtendee = async (req, res) => {
    try {
        const { id } = req.params;

        
        const Atendee = await Atendee.findByPk(id);

        if (!Atendee) {
            return res.status(404).json({ message: 'Asistente no encontrado' });
        }

       
        await Atendee.destroy();

        res.status(204).send(); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
