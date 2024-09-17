// src/swagger/swaggerOptions.js

const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API de Gestión de Eventos",
            version: "1.0.0",
            description: "API para gestionar eventos y asistentes.",
            contact: {
                name: "Soporte",
                email: "soporte@example.com"
            },
            servers: [
                {
                    url: "http://localhost:3000",
                    description: "Servidor de desarrollo"
                }
            ]
        },
    },
    apis: ["./src/routes/*.js"],  
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
