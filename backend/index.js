const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

//CORS
app.use(cors());


//Database
require('./database');

//Midlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Settings
app.set('port', process.env.PORT || 3000);

//Importar Rutas
const routes = require('./routes/index.routes');

//Usar Rutas
app.use('/api', routes);

//Funcion de Lanzamiento
async function Init() {
    await app.listen(app.get('port'));
    console.log('Servidor en Puerto ', app.get('port'));
}

//Lanzamiento
Init();