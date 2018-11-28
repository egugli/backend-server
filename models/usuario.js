'use strict'

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var rolesValidos = {
	values: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_ALUMNO'],
	message: '{VALUE} no es un rol permitido'
};
var usuarioSchema = new Schema({

	nombre: { type: String, required: [true, 'El nombre es necesario'] },
	email: { type: String, unique: true, required: [true, 'El correo es necesario'] },
	password: { type: String, required: [true, 'La contraseña es necesaria'] },
	password: { type: String, required: [true, 'La contraseña es necesaria'] },
	img: { type: String, required: false },
	role: { type: String, required: true, default: 'ROLE_USER', enum: rolesValidos }

});

usuarioSchema.plugin( uniqueValidator, {message: 'El {PATH} debe ser unico'});
module.exports = mongoose.model('Usuario', usuarioSchema);