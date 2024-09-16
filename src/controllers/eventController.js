// src/controllers/eventController.js
require('dotenv').config();
const Event = require('../models/eventModel');
const Atendee = require('../models/atendeeModel'); 
const connection = require('../config/database');
const path = require('path');
const xlsx = require('xlsx');


exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.findAll();

        
        const eventsWithSites = await Promise.all(events.map(async (event) => {
            try {
                
                const response = await fetch(process.env.FETCH_URL_ADRESS+'/api/events/findNearSites', {
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
        
        const event = await Event.findByPk(id);

        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        try {
            const response = await fetch('http://localhost:3000/api/events/findNearSites', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ location: event.location })
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

            res.status(200).json({
                ...event.toJSON(),
                nearbySites: relevantData
            });

        } catch (error) {
            console.error(`Error fetching nearby sites for event ${id}: ${error.message}`);
            res.status(200).json({
                ...event.toJSON(),
                nearbySites: []
            });
        }

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

exports.getAttendanceByDay = async (req, res) => {
    console.log("Entro a attendace by day");
    try {
        // Obtener todas las asistencias (Atendees) de la base de datos
        const atendees = await Atendee.findAll({
            //include: Event,  // Incluye los eventos relacionados
        });

        // Inicializamos un objeto para contar los asistentes por día
        const attendanceByDay = {
            Monday: 0,
            Tuesday: 0,
            Wednesday: 0,
            Thursday: 0,
            Friday: 0,
            Saturday: 0,
            Sunday: 0,
        };

        // Iteramos sobre cada asistente y calculamos el día de la semana de su registro
        atendees.forEach(atendee => {
            const registrationDate = new Date(atendee.registration_date);
            const dayOfWeek = registrationDate.getDay();  // 0 es domingo, 6 es sábado

            switch (dayOfWeek) {
                case 0:
                    attendanceByDay.Sunday++;
                    break;
                case 1:
                    attendanceByDay.Monday++;
                    break;
                case 2:
                    attendanceByDay.Tuesday++;
                    break;
                case 3:
                    attendanceByDay.Wednesday++;
                    break;
                case 4:
                    attendanceByDay.Thursday++;
                    break;
                case 5:
                    attendanceByDay.Friday++;
                    break;
                case 6:
                    attendanceByDay.Saturday++;
                    break;
            }
        });

        // Devolvemos los resultados en formato JSON
        res.status(200).json(attendanceByDay);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.uploadEventsFromExcel = async (req, res) => {
    try {
        // Asegúrate de que el archivo ha sido subido por multer
        const filePath = path.join(__dirname, '../uploads', "req.file.filename");

        // Leer el archivo Excel
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];  // Leer la primera hoja
        const sheet = workbook.Sheets[sheetName];

        // Convertir la hoja de Excel a JSON
        const eventsData = xlsx.utils.sheet_to_json(sheet);

        // Recorrer los datos y crear los eventos
        for (const event of eventsData) {
            await Event.create({
                title: event.title,
                description: event.description,
                date: event.date,
                location: event.location,
                organizerId: event.organizerId
            });
        }

        res.status(200).json({ message: 'Eventos cargados exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
