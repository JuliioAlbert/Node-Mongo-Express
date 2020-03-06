const express = require('express');
const app = express();


//modelo para funciones en bd

let Libro = require('../models/libro');


//obtener 

app.get('/', (req, res, next) => {

    Libro.find({}, 'area')
        .exec(
            (err, libros) => {

                if (err) {
                    returnres.status(500).json({
                        ok: false,
                        mensaje: 'Error Cargando Libros',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    libros
                });
            })
});

//crear usuario
app.post('/', (req, res) => {

    var body = req.body;

    var libro = new Libro({
        numeroadquisicion: body.numeroadquisicion,
        titulo: body.titulo,
        autor: body.autor,
        clasificacion: body.clasificacion,
        editorial: body.editorial,
        ejemplar: body.ejemplar,
        volumen: body.volumen,
        tomo: body.tomo,
        biblioteca: body.biblioteca,
        material: body.material,
        coleccion: body.coleccion,
        numficha: body.numficha,
        img: body.img,
        descripcion: body.descripcion,
        area: body.area
    });
    libro.save((err, libroR) => {
        if (err) {
            returnres.status(500).json({
                ok: false,
                mensaje: 'Error crear Lirbo',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            libroR
        });

    });



});

module.exports = app;