'use strict'


//Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


// Inicializar variables
var app = express();


// middlewares dd bodyparser (midleware es que se ejecuta antes de la peticion)

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Importar rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var hospitalRoutes = require('./routes/hospital');
var medicoRoutes = require('./routes/medico');
var busquedaRoutes = require('./routes/busqueda');
var uploadRoutes = require('./routes/upload');
var imagenesRoutes = require('./routes/imagenes');

// Conxion a la base de datos
mongoose.connect('mongodb://localhost:27017/hospitalDB', (err, res) => 

	{
		if(err) throw err;
		console.log('Base de datos: \x1b[32m%s\x1b[0m',  'online');
//		useMongoClient: true
	}) 


// Rutas
app.use('/usuario', usuarioRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/medico', medicoRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/upload', uploadRoutes);
app.use('/img', imagenesRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);


//escuchar peticiones
app.listen(3000, () =>{
	console.log('Express en puerto 3000: \x1b[32m%s\x1b[0m',  'online');
})