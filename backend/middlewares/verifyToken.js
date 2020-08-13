const jwt = require('jsonwebtoken');
const config = require('../config');

exports.auth = function (req, res, next) {
    let token = req.header('Authorization');

    if(!token) {
        return res.status(401).json({
            ok: false,
            mensaje: 'No hay token'
        });
    };

    token = token.split(' ')[1]

    if(!token) {
        return res.status(401).json({
            ok: false,
            mensaje: 'No hay token'
        });
    };

    try{
        const decoded = jwt.verify(token, config.secret);
        req.userId = decoded._id;
        next();
    }

    catch(e){
        res.status(401).send('Acceso Denegado. Token no valido');
    }
  };