// src/controllers/eventController.js
require('dotenv').config();
const Event = require('../models/eventModel');
const connection = require('../config/database');


exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.findAll();

        
        const eventsWithSites = await Promise.all(events.map(async (event) => {
            try {
                
                const response = await fetch('http://localhost:3000/api/events/findNearSites', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ direccion: event.location })
                });

                if (!response.ok) {
                    throw new Error(`Error en la respuesta de la API: ${response.statusText}`);
                }

                const data = await response.json();

                
                const relevantData = data.features.map(feature => ({
                    id: feature.id,
                    place_name: feature.place_name,
                    coordinates: feature.geometry.coordinates
                }));

                
                return {
                    ...event.toJSON(),
                    nearbySites: relevantData
                };
            } catch (error) {
                console.error(`Error fetching sites for event ${event.id}: ${error.message}`);
                return {
                    ...event.toJSON(),
                    nearbySites: []
                };
            }
        }));

        res.status(200).json(eventsWithSites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.getEventById = async (req, res) => {
    try {
        const { id } = req.params; 

        
        const event = await Event.findByPk(id, {
            //include: ['organizer'] 
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
    const accessToken = process.env.MAP_BOX_KEY;
    const address = req.body.direccion;
    const encodedAddress = encodeURIComponent(address);
    console.log("URI Adress", encodedAddress);
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${accessToken}`)
    .then(response => response.json())
    .then(data => {
        const [longitude, latitude] = data.features[0].center;

        return fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}&proximity=${longitude},${latitude}&limit=poi`);
    })
    .then(response => response.json())
    .then(data => {
        res.send(data);
    })
    .catch(error => {
        res.error({'Error':error});
    });

}

