//required
require('./config/bd');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
    //importar Rutas
const appRoutes = require('./routes/app');
const libroRoute = require('./routes/libro');

//inicializar variables
var app = express();


//Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Importar Rutas
app.use('/libro', libroRoute);
app.use('/', appRoutes);



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
app.listen(3000, () => {
    console.log('Express corriendo Puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});