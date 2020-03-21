const express = require('express');
const app = express();

var Libro = require('../models/libro');


//rutas
app.get('/:area', (req, res, next) => {

    var area = req.params.area;
    var regex = new RegExp(area, 'i');


    Promise.all([buscarLibros(area, regex)])
        .then(respuestas => {
            res.status(200).json({
                ok: true,
                libros: respuestas[0],

            });

        })   
});
function buscarLibros(area, regex) {

    return new Promise((resolve, reject) => {

        Libro.find({ area: regex }, (err, libros) => {
            if (err) {
                reject('Error al cargar Libros', err);
            } else {
                resolve(libros)
            }
        });
    });
}

module.exports = app;