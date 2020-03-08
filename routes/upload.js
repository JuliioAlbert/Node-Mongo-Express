const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
//Libreria para eliminar 

const fs = require('fs');


//Modelo Para insertar las imagenes

const Libro = require('../models/libro');
const Usuario = require('../models/usuario');


//Middelware
app.use(fileUpload());


//rutas
app.put('/:tipo/:id', (req, res, next) => {

    var tipo = req.params.tipo;
    var id = req.params.id;


    //tipos de coleccion

    var tiposValidos = ['libros', 'usuarios'];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'El tipo de Coleccion no es valida',
            errors: { message: 'Coleccion no valida' }
        });
    }

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No subio Nada',
            errors: { message: 'Debe Seleccionar Imagen' }
        });
    }
    //obtener nombre del archivo

    const archivo = req.files.imagen;
    const nombreCortado = archivo.name.split('.');
    const extensionArch = nombreCortado[nombreCortado.length - 1];

    //Solo estas Extensiones Acetamon
    const extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (extensionesValidas.indexOf(extensionArch) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Extension no válida',
            errors: { message: 'Las extensiones válidas son ' + extensionesValidas.join(', ') }
        });
    }

    //Nombre de Archivo personalizado 

    var nombreArc = `${id}-${new Date().getMilliseconds()}.${extensionArch}`;

    //Mover el Archivo del Temporal o PATH

    var path = `./uploads/${tipo}/${nombreArc}`

    archivo.mv(path, (err) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error a el Mover Archivo',
                errors: err
            });
        }
    })

    subirPorTipo(tipo, id, nombreArc, res);

});

function subirPorTipo(tipo, id, nombreArc, res) {

    if (tipo === 'libro') {

        Usuario.findById(id, (err, libro) => {
            var pathViejo = './uploads/libros/' + libro.img;

            //Si existe Eliminar la imagen anterior

            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }

            libro.img = nombreArc;
            libro.save((err, libroAct) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error a el Subir imagen',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen Actualizada',
                    libroAct

                });
            });


        });


    }
    if (tipo === 'usuario') {

    }


}







module.exports = app;