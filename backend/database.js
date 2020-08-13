const mongoose = require('mongoose');
const URI = 'mongodb://localhost/ventas';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('Base de Datos Conectada'))
    .catch(err => console.log(err));