const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let libroSchema = new Schema({
    numeroadquisicion: {
        type: Number,
        required: [true, 'Es necesario'],

    },
    titulo: {
        unique: false,
        type: String,
        required: [true, 'Es necesario']
    },
    autor: {
        type: String,
        required: [true, 'Es necesario']
    },
    clasificacion: {
        type: String,
        /* required: [true, 'Es necesario'] */
    },
    editorial: {
        type: String,
        required: [true, 'Es necesario']
    },
    ejemplar: {
        type: Number,
        default: 1
    },
    volumen: {
        type: Number,
        default: 0
    },
    tomo: {
        type: String,
        default: 0
    },
    biblioteca: {
        type: String,
        default: "Centro de Informacion ITSJ"
    },
    material: {
        type: String,
        default: "Libros"
    },
    coleccion: {
        type: String,
        default: "Coleccion / Fondo / Acervo"
    },
    numficha: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        default: "url"
    },
    descripcion: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Libro', libroSchema);