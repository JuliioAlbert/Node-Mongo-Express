//required
require('./config/bd');

var express = require('express');
var mongoose = require('mongoose');

//inicializar variables

var app = express();


//rutas
app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Peticion Correcta'
    });
});
//Conexxion
mongoose.connect(process.env.URLDB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, res) => {
    if (err) throw err;
    console.log('Base de datos ONLINE');
});

//escuchar Peticiones
app.listen(3000, () => {
    console.log('Express corriendo Puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});