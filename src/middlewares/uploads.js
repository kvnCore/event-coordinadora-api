// src/middleware/uploadMiddleware.js
const multer = require('multer');
const path = require('path');

// Configuración de multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');  // Carpeta donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));  // Nombre del archivo con timestamp
    }
});

const upload = multer({ storage });

module.exports = upload;