// src/controllers/eventController.js
const Event = require('../models/eventModel');
const connection = require('../config/database');


exports.getAllEvents = async (req, res) => {
    try {
        
        const events = await Event.findAll({
            include: ['organizer']  
        });

        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });  
    }
};

exports.getEventById = async (req, res) => {
    try {
        const { id } = req.params; 

        
        const event = await Event.findByPk(id, {
            include: ['organizer'] 
        });

        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};

exports.createEvent = async (req, res) => {
    try {
        const { title, description, date, location, organizerId } = req.body;

       
        const newEvent = await Event.create({
            title,
            description,
            date,
            location,
            organizerId  
        });

        
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });  
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const { id } = req.params;  
        const { title, description, date, location } = req.body;  

        
        const event = await Event.findByPk(id);

        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        
        event.title = title || event.title;
        event.description = description || event.description;
        event.date = date || event.date;
        event.location = location || event.location;

        
        await event.save();

        res.status(200).json(event);  
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;

        
        const event = await Event.findByPk(id);

        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

       
        await event.destroy();

        res.status(204).send(); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.findNearSites = async (req, res) => {
    const accessToken = 'pk.eyJ1Ijoia3ZuY29yZSIsImEiOiJjbTEzd2lnbXEwdG9mMmxwdzdxZ2Fhb2dtIn0.3_jDppQDQH5_4aUs5pErng';
    const address = req.body.direccion;
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${accessToken}`)
    .then(response => response.json())
    .then(data => {
        const [longitude, latitude] = data.features[0].center;

        return fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}&proximity=${longitude},${latitude}&limit=10&type=poi`);
    })
    .then(response => response.json())
    .then(data => {
        console.log('Lugares Cercanos:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

}
