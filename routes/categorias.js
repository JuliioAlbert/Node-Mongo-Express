const express = require('express');
const app = express();

var Libro = require('../models/libro');


//rutas
app.get('/:area', (req, res, next) => {

    var area = req.params.area;

    Libro.find({ area: area}, (err, areaBD) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error crear Lirbo',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            mensaje: 'Peticion Correcta',
            areaBD
        });

    })

   
});

module.exports = app;