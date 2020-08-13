const mongoose = require('mongoose');
const {Schema} = mongoose;



const ClienteSchema = new Schema({
    nombre: String,
    dni: String,
    correo: String,
    puntos: Number,
    createAt: {type: Date, default: Date.now}
    
});

const Cliente = mongoose.model('Cliente', ClienteSchema);

module.exports = Cliente;