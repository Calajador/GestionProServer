const mongoose = require('mongoose');
const {Schema} = mongoose;



const DetalleventaSchema = new Schema({
    idproducto: {type: Schema.ObjectId, ref: 'Producto'},
    idcliente: {type: Schema.ObjectId, ref: 'Cliente'},
    cantidad: Number,
    idventa: {type: Schema.ObjectId, ref: 'Venta'}
    
});

const Detalleventa = mongoose.model('Detalleventa', DetalleventaSchema);

module.exports = Detalleventa;