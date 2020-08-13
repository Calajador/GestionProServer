const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProveedoresSchema = new Schema({
    nombre: {type: String, required: true},
    persona_contacto: {type: String, required: true},
    descripcion: {type: String, required: true},
    email: {type: String, required: true},
    satisfaccion: {type: Number, required: true},
    problemas: {type: Number, required: true},
    ventas: {type: Number, required: true}
});

const Proveedores = mongoose.model('Proveedores', ProveedoresSchema);

module.exports = Proveedores;