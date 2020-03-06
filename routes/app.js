const express = require('express');
const app = express();


//rutas
app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Peticion Correcta'
    });
});

module.exports = app;