'use strict'


//Requires
var express = require('express');
var mongoose = require('mongoose');
//var bodyParser = require('body-parser');


// Inicializar variables
var app = express();

// Conxion a la base de datos
mongoose.connect('mongodb://localhost:27017/hospitalDB', (err, res) => 

	{
		if(err) throw err;
		console.log('Base de datos: \x1b[32m%s\x1b[0m',  'online');
//		useMongoClient: true
	}) 
//rutas
app.get('/', (req, res, next) => {

	res.status(200).json({
		ok: true,
		mensaje: 'Peticion realizada OK'
	});

});




//escuchar peticiones
app.listen(3000, () =>{
	console.log('Express en puerto 3000: \x1b[32m%s\x1b[0m',  'online');
})