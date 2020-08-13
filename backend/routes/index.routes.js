const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');

// Importaciones para Subida de imagenes
const multipar = require ('connect-multiparty');
const path = multipar({uploadDir: './uploads/productos'});


const user = require('../controllers/user.controller');
const categoria = require('../controllers/categoria.controller');
const producto = require('../controllers/producto.controller');
const cliente = require('../controllers/cliente.controller');
const venta = require('../controllers/venta.controller');
const proveedor = require('../controllers/proveedores.controller');


//Rutas Usuarios
router.post('/registrar', verifyToken.auth, user.registrar);
router.post('/login', user.login);
router.get('/users', user.listar);
router.get('/users/:id', user.obtener);
router.patch('/users/editar/:id', user.upUser);
router.delete('/users/eliminar/:id', user.deleteUser);

//Rutas Categorias
router.post('/categoria/registrar', verifyToken.auth, categoria.registrar);
router.get('/categoria/:id', categoria.obtener_categoria);
router.patch('/categoria/editar/:id', categoria.editar);
router.delete('/categoria/eliminar/:id', categoria.eliminar);
router.get('/categorias/:nombre?', categoria.listar);

//Rutas Productos
router.post('/producto/registrar', verifyToken.auth, path, producto.registrar);
router.get('/productos/:titulo?', producto.listar);
router.patch('/producto/editar/:id/:img?', path, producto.editar);
router.get('/producto/:id', producto.obtener);
router.delete('/producto/eliminar/:id', verifyToken.auth, producto.eliminar);
router.put('/producto/stock/:id', verifyToken.auth, producto.stock);
router.get('/producto/img/:img?', producto.ObtenerImagen);

//Rutas CLiente
router.post('/cliente/registrar', verifyToken.auth, cliente.registrar);
router.get('/clientes', cliente.listar);
router.get('/cliente/:id', cliente.obtener_cliente);
router.patch('/cliente/editar/:id', cliente.editar);
router.delete('/cliente/eliminar/:id', verifyToken.auth, cliente.eliminar);

//Rutas Venta
router.post('/venta/registrar', verifyToken.auth, venta.regisctrar);
router.get('/venta/obtener/:id', venta.datos);
router.get('/venta/:id', venta.detalles);
router.get('/ventas', venta.listar);

//Rutas Proveedores
router.post('/proveedores/registrar', verifyToken.auth, proveedor.crearProveedor);
router.get('/proveedores', proveedor.getProveedores);
router.get('/proveedores/:id', proveedor.obtener);
router.patch('/proveedores/actualizar/:provId', proveedor.upProveedor);
router.delete('/proveedores/eliminar/:provId', verifyToken.auth, proveedor.deleteProveedor);


module.exports = router;