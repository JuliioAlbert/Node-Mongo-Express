const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let rolesValidos = {
    values: ['Admin', 'Estudiante'],
    message: '{VALUE} no es un rol Valido'
};

let usuarioSchema = new Schema({
    nocontrol: {
        type: Number,
        required: [true, 'El numero de control es necesario']
    },
    nip: {
        type: Number,
        required: [true, 'El nip es necesario']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true,
        default: 'Estudiante',
        enum: rolesValidos
    }
});
module.exports = mongoose.model('Usuario', usuarioSchema);