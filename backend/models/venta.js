const mongoose = require('mongoose');
const {Schema} = mongoose;



const VentaSchema = new Schema({
    idcliente: {type: Schema.ObjectId, ref: 'Cliente'},
    iduser: {type: Schema.ObjectId, ref: 'User'},
    fecha: {type: Date, default: Date.now}
    
});

const Venta = mongoose.model('Venta', VentaSchema);

module.exports = Venta;