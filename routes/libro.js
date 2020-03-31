const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

//modelo para funciones en bd

let Libro = require('../models/libro');

//Libreria para eliminar 
const fs = require('fs');
const path = require('path');

//Middelware
app.use(fileUpload());


//obtener 
app.get('/', (req, res, next) => {
    var page = req.query.page || 0;
    page = Number(page);

    Libro.find({})
        .skip(page)
        .limit(35)
        .exec(
            (err, libros) => {

                if (err) {
                    returnres.status(500).json({
                        ok: false,
                        mensaje: 'Error Cargando Libros',
                        errors: err
                    });
                }
                Libro.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        libros,
                        total: conteo
                    });
                });

            });
});

//crear usuario
app.post('/', (req, res) => {

    var body = req.body;
    //Si no viene url o imagen se pone no image
    if (!req.files && !body.url) {
        let NoImage= path.resolve(__dirname,'../assets/no.png');
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
            img: NoImage,
            descripcion: body.descripcion,
            area: body.area
        });
        libro.save((err, libroR) => {
            if (err) {
                return res.status(500).json({
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
        



    } else if (!req.files && body.url) {
          let img=body.url;
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
             img: img,
             descripcion: body.descripcion,
             area: body.area
         });
         libro.save((err, libroR) => {
             if (err) {
                 return res.status(500).json({
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
    } else if (req.files && !body.url) {
        const imagen = req.files.imagen;
        //Extensiones Permitidas
        const nombreImagen = imagen.name.split('.');
        const extension = nombreImagen[nombreImagen.length - 1];
        const extensionesValidas = ['jpg', 'jpeg', 'png'];

        if (extensionesValidas.indexOf(extension) < 0) {
            return res.status(400).json({
                ok: false,
                err: {
                    mensaje: "No se permite " + extension + " Solo se permite " + extensionesValidas.join(', ')
                }
            });
        }

        //Cambiar Nombre al archivo
        const nImagen = `${body.area}${body.titulo}-${new Date().getMilliseconds()}.${extension}`


        imagen.mv(`public/libros/${nImagen}`, (err) => {
            let host=req.hostname;
            let img = `${host}/libros/${nImagen}`;
            //let img = path.resolve(__dirname,`uploads/libros/${nImagen}`);
          
            if (err) {
                borrarArchivo(nImagen);
                return res.status(500).json({
                    ok: true,
                    err
                })
            };
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
                img: img,
                descripcion: body.descripcion,
                area: body.area,
                cantidad: body.cantidad
            });
            libro.save((err, libroR) => {
                if (err) {
                    borrarArchivo(nImagen);
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error crear Libro',
                        errors: err
                    });
                }
                res.status(201).json({
                    ok: true,
                    libroR
                });

            });




        });

    } else if (req.files && body.url) {

        res.json({
            ok: true,
            mensaje: "Vienen Los Dos"
        })
    }
    /* 
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
                return res.status(500).json({
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
     */


});
function borrarArchivo(nombreImagen) {
    let pathImage = path.resolve(__dirname, `../../uploads/libros${nombreImagen}`);
    if (fs.existsSync(pathImage)) {
        fs.unlinkSync(pathImage);
    }

}


module.exports = app;