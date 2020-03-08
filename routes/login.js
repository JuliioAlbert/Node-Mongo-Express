const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;


let Usuario = require('../models/usuario');

app.post('/', (req, res) => {

    var body = req.body;

    Usuario.findOne({ nocontrol: body.nocontrol }, (err, usuarioDB) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar no control',
                errors: err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'credenciales incorrectas - no control',
                errors: err
            });
        }
        if (!(body.nip == usuarioDB.nip)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'credenciales incorrectas - nip',
                errors: err
            });
        }

        //crear un Token!!
        usuarioDB.nip = ':)'
        var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 });




        res.status(200).json({
            ok: true,
            usuarioDB,
            token: token,
            id: usuarioDB._id

        });
    });



});









module.exports = app;