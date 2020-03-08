const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
var mdAutenticacion = require('../middelwares/autenticacion');

//modelo para funciones en bd

var Usuario = require('../models/usuario');


//===================================
//Obtener usuario
//===================================

app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Usuario.find({}, 'nocontrol nip img role')
        .skip(desde)
        .limit(5)
        .exec(
            (err, usuarios) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando usuario',
                        errors: err
                    });
                }

                Usuario.count({}, (err, conteo) => {

                    res.status(200).json({
                        ok: true,
                        usuarios: usuarios,
                        total: conteo
                    });

                })




            });
});


//===================================
//crear usuario
//===================================
app.put('/:id', (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, usuario) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id ' + id + ' no existe',
                errors: { message: 'No existe un usuario con ese ID' }
            });
        }


        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save((err, usuarioGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }

            usuarioGuardado.password = ':)';

            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });

        });

    });

});



//===================================
//crear usuario
//===================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;
    var usuario = new Usuario({
        nocontrol: body.nocontrol,
        nip: body.nip,
        img: body.img,
        role: body.role
    });
    usuario.save((err, usuarioR) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error crear usuario',
                err
            });
        }

        res.status(201).json({
            ok: true,
            usuarioR,
            usuariotoken: req.usuario
        });

    });
});


//===================================
//eliminar usuario
//===================================

app.delete('/:id', (req, res) => {
    var id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar Usuario',
                err
            });
        }

        if (!usuarioB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error No existe Usuario',
                err
            });
        }

        res.status(201).json({
            ok: true,
            usuarioB
        });
    });
});

module.exports = app;