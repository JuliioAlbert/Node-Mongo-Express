//required
require('./config/bd');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

//importar Rutas
const appRoutes = require('./routes/app');
const libroRoute = require('./routes/libro');
const usuarioRoute = require('./routes/usuario');
const loginRoute = require('./routes/login');
const busquedaRoute = require('./routes/busqueda');
const uploadRoute = require('./routes/upload');
const imagenesRoute = require('./routes/imagenes');

//inicializar variables
var app = express();


//Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Server Index Config
var serveIndex = require('serve-index');
app.use(express.static(__dirname + '/'))
app.use('/uploads', serveIndex(__dirname + '/uploads'));


// Importar Rutas
app.use('/', appRoutes);
app.use('/libro', libroRoute);
app.use('/usuario', usuarioRoute);
app.use('/login', loginRoute);
app.use('/busqueda', busquedaRoute);
app.use('/upload', uploadRoute);
app.use('/img', imagenesRoute);


//Conexion
mongoose.connect(process.env.URLDB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, res) => {
    if (err) throw err;
    console.log('Base de datos ONLINE');
});

//escuchar Peticiones
app.listen(3001, () => {
    console.log('Express corriendo Puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});