const mongoose = require('mongoose');
const {Schema} = mongoose;



const ProductoSchema = new Schema({
    titulo: String,
    descripcion: String,
    imagen: String,
    precio_compra: Number,
    precio_venta: Number,
    stock: Number,
    idcatedoria: {type: Schema.ObjectId, ref: 'Categoria'},
    puntos: Number
});

const Producto = mongoose.model('Producto', ProductoSchema);

module.exports = Producto;
