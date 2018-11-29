'use strict'


//Requires
var express = require('express');

var fileUpload = require('express-fileupload');
var fs  = require('fs');

var app = express();

var Hospital = require('../models/hospital');
var Medico = require('../models/medico');
var Usuario = require('../models/usuario');

// default options
app.use(fileUpload());

//rutas
app.put('/:tipo/:id', (req, res, next) => {

	var tipo = req.params.tipo;
	var id = req.params.id;

	// tipos de coleccion
	var tiposValidos = ['hospitales', 'medicos', 'usuarios']

	if(tiposValidos.indexOf( tipo ) < 0){
				return 	res.status(400).json({
						ok: false,
						mensaje: 'Tipo coleccion no valida',
						errors: {message: 'Tipo coleccion no valida, debe ser: ' + tiposValidos.join(', ') }
						});

	}
	if(!req.files){
				return 	res.status(400).json({
						ok: false,
						mensaje: 'No selecciono archivo',
						errors: {message: 'No selecciono archivo'}
						});
	}

	// Obtener nombre del archivo
	var archivo = req.files.imagen;
	var nombreCortado = archivo.name.split('.');
	var extensionArchivo = nombreCortado[ nombreCortado.length -1];

	// Solo estas extensiones aceptamos
	var extensionesValidas = ['png', 'jpg', 'gif','jpeg'];

	if(extensionesValidas.indexOf(extensionArchivo) <0 ){
				return 	res.status(400).json({
						ok: false,
						mensaje: 'Extension no valida',
						errors: {message: 'Extension no valida, debe ser: ' + extensionesValidas.join(', ') }
						});

	}

	// Nombre de archivo personalizado
	var nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extensionArchivo}`;

	// Mover el archivo del temporal a un path



	var path = `./uploads/${tipo}/${nombreArchivo}`;

	archivo.mv( path, err =>{
		if(err){
				return 	res.status(500).json({
						ok: false,
						mensaje: 'Error al mover archivo',
						errors: err
						});			
		}

		subirPorTipo( tipo, id, nombreArchivo, res);




	})



});


function subirPorTipo( tipo, id, nombreArchivo, res){

	if(tipo === 'usuarios'){
		Usuario.findById(id, (err, usuario) => {
			// **** se puede validar el error para salir
			if(!usuario){
				return res.status(400).json({
					ok: false,
					mensaje: 'Usuario no existe ',
					errors: {message: 'Usuario no existe'}
				});

			}
			// busca si hay imagen vieja
			var pathViejo = './uploads/usuarios/' + usuario.img;

			if( fs.existsSync(pathViejo)){
				fs.unlink(pathViejo);
			}

			usuario.img = nombreArchivo;

			usuario.save( (err, usuarioActualizado) => {

				// **** Tambien se deria validar el error para salir

				usuarioActualizado.password = ':)';
				return res.status(200).json({
					ok: true,
					mensaje: 'Imagen de Usuario actualizada ',
					usuario: usuarioActualizado
				});

			})

		});

	}

	if(tipo === 'medicos'){
		Medico.findById(id, (err, medico) => {
			// **** se puede validar el error para salir
			if(!medico){
				return res.status(400).json({
					ok: false,
					mensaje: 'Medico no existe ',
					errors: {message: 'Medico no existe'}
				});

			}
			// busca si hay imagen vieja
			var pathViejo = './uploads/medicos/' + medico.img;

			if( fs.existsSync(pathViejo)){
				fs.unlink(pathViejo);
			}

			medico.img = nombreArchivo;

			medico.save( (err, medicoActualizado) => {

				// **** Tambien se deria validar el error para salir
				return res.status(200).json({
					ok: true,
					mensaje: 'Imagen de medico actualizada ',
					medico: medicoActualizado
				});

			})

		});
		
	}

	if(tipo === 'hospitales'){
		Hospital.findById(id, (err, hospital) => {
			// **** se puede validar el error para salir
			if(!hospital){
				return res.status(400).json({
					ok: false,
					mensaje: 'Hospital no existe ',
					errors: {message: 'Hospital no existe'}
				});

			}
			// busca si hay imagen vieja
			var pathViejo = './uploads/hospitales/' + hospital.img;

			if( fs.existsSync(pathViejo)){
				fs.unlink(pathViejo);
			}

			hospital.img = nombreArchivo;

			hospital.save( (err, hospitalActualizado) => {

				// **** Tambien se deria validar el error para salir
				return res.status(200).json({
					ok: true,
					mensaje: 'Imagen de hospital actualizada ',
					hospital: hospitalActualizado
				});

			})

		});
		
	}	
}

module.exports = app;