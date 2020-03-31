const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let rolesValidos = {
    values: ['Admin', 'Estudiante'],
    message: '{VALUE} no es un rol Valido'
};

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre  es necesario en el backend']
    },
    rfc: {
        unique: [true, 'Ya existe el RFC '],
        type: String,
        required: [true, 'El rfc es necesario en el backend']
    },
    password: {
        type: String,
        required: [true, 'El Password es necesarios']
    },
});
usuarioSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Usuario', usuarioSchema);