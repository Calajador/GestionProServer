const mongoose = require('mongoose');
const {Schema} = mongoose;



const CategoriaSchema = new Schema({
    titulo: String,
    descripcion: String
    
});

const Categoria = mongoose.model('Categoria', CategoriaSchema);

module.exports = Categoria;
