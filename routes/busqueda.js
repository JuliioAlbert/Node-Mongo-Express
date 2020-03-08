const express = require('express');
const app = express();

var Libro = require('../models/libro');
//rutas
app.get('/todo/:busqueda', (req, res, next) => {

    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');


    Promise.all([buscarLibros(busqueda, regex)])
        .then(respuestas => {
            res.status(200).json({
                ok: true,
                libros: respuestas[0],

            });

        })



});

function buscarLibros(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Libro.find({ titulo: regex }, (err, libros) => {
            if (err) {
                reject('Error al cargar Libros', err);
            } else {
                resolve(libros)
            }
        });
    });
}

module.exports = app;