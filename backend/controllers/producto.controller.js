const Producto = require('../models/producto');
const fs = require('fs');
const path = require('path');

productoCTRL = {};

productoCTRL.registrar = async (req, res) => {

    //Recogemos lo que viene del body y lo almacenamos
    let data = req.body;

    // Comprobamos si vienen archivos
    if(req.files.imagen) {

        //Si vienen extraemos el nombre
        let imagen_path = req.files.imagen.path;
        let name = imagen_path.split('\\');
        let imagen_name = name[2];

        // Creamos el Producto
        let producto = new Producto({
            titulo: data.titulo,
            descripcion: data.descripcion,
            imagen: imagen_name,
            precio_compra: data.precio_compra,
            precio_venta: data.precio_venta,
            stock: data.stock,
            idcatedoria: data.idcatedoria,
            puntos: data.puntos
        });

        // Guardamos el producto Comprobando posibles errores
        await producto.save((err, result) => {
            if(err)
            {
                res.status(500).send('Error en el servidor');
            }

            else
            {
                if(result)
                {
                    res.status(200).send(result);
                }

                else 
                {
                    res.status(403).send('El producto no se ha podido registrar');
                }
            }
        });
    }

    else {

        let producto = new Producto({
            titulo: data.titulo,
            descripcion: data.descripcion,
            imagen: null,
            precio_compra: data.precio_compra,
            precio_venta: data.precio_venta,
            stock: data.stock,
            idcatedoria: data.idcatedoria,
            puntos: data.puntos
        });

        // Guardamos el producto Comprobando posibles errores
        await producto.save((err, result) => {
            if(err)
            {
                res.status(500).send('Error en el servidor');
            }

            else
            {
                if(result)
                {
                    res.status(200).send(result);
                }

                else 
                {
                    res.status(403).send('El producto no se ha podido registrar');
                }
            }
        });
    }
}

productoCTRL.listar = async (req, res) => {
    let titulo = req.params.titulo;

    let producto = await Producto.find({
        titulo: new RegExp(titulo, 'i')
    })
    .populate('idcatedoria')

    if(!producto) {
        return res.status(404).json({
            ok: false,
            mensaje: 'No hay producto'
        });
    };

    res.status(200).send({
        productos: producto
    });
}

productoCTRL.editar = async (req, res) => {
    let id = req.params.id;  //Cogemos Id que enviamos desde la ruta, dado que le dimos el nombre id
    let data = req.body;  //Cogemos los datos enviados
    let img = req.params.img
 

    if(req.files.imagen) {

        if(img || img != null ||img != undefined) {
            fs.unlink('./uploads/productos/'+img, (err) => {
                if(err) throw err;
            });
        } 

        //Si vienen extraemos el nombre
        let imagen_path = req.files.imagen.path;
        let name = imagen_path.split('\\');
        let imagen_name = name[2];

        let productoUp = await Producto.findByIdAndUpdate(
            {_id: id},
            {titulo: data.titulo,
            descripcion: data.descripcion,
            imagen: imagen_name,
            precio_compra: data.precio_compra,
            precio_venta: data.precio_venta,
            idcatedoria: data.idcatedoria,
            puntos: data.puntos}
        )

        if(!productoUp) {  // Por si algo falla y no se encuentra el Id
            return res.status(404).json({
                ok: false,
                mensaje: 'No hay producto'
            });
        };

        res.status(200).json({  // Si todo sale bien
            ok: true,
            mensaje: 'Producto Actualizado',
            productoUp
        });
    } 

    else {

        let productoUp = await Producto.findByIdAndUpdate(
            {_id: id}, //Donde el id coincida con el id que enviamos por las rutas
            {$set: data}  //Lo actualizamos con el contenido que enviamos
        );
    
        if(!productoUp) {  // Por si algo falla y no se encuentra el Id
            return res.status(404).json({
                ok: false,
                mensaje: 'No hay producto'
            });
        };
    
        res.status(200).json({  // Si todo sale bien
            ok: true,
            mensaje: 'Producto Actualizado',
            productoUp
        });
    }

    
}

productoCTRL.obtener = async (req, res) => {
    let id = req.params.id;

    if(!id) return res.status(401).send({message: 'Error en el Servidor'});

    const producto = await Producto.findOne(
        {_id: id}
    ).populate('idcatedoria')

    res.status(200).send({producto:producto});
}

productoCTRL.eliminar = async (req, res) => {
    let id = req.params.id;

    let producto = await Producto.findOneAndRemove(
        {_id: id}
    );

    if(!producto) {
        return res.status(404).json({
            ok: false,
            mensaje: 'No hay producto'
        });
    }

    else {

        fs.unlink('./uploads/productos/' + producto.imagen, (err) => {
            if(err) throw err;
        });

        res.status(200).json({
            ok: true,
            mensaje: 'Producto eliminado'
        });
    }

    
}

productoCTRL.stock = async (req, res) => {
    let id = req.params.id; 
    let data = req.body; 

     await Producto.findById(
        id, async (err, producto_data) => {
            if(producto_data) {
                await Producto.findByIdAndUpdate(id, {stock: parseInt(producto_data.stock) + parseInt(data.stock)},
                (err, producto_edit) => {
                    if(producto_edit) {
                        res.status(200).send(producto_edit);
                    }
                })
            }

            else {
                res.status(500).send(err);
            }
        }
    )
} 

productoCTRL.ObtenerImagen = (req, res) => {
    let img = req.params['img'];

    if(img!= "null") {
        let path_img = './uploads/productos/'+ img;
        res.status(200).sendFile(path.resolve(path_img));
    }

    else {
        let path_img = './uploads/productos/default.jpg';
        res.status(200).sendFile(path.resolve(path_img));

    }
}
 
module.exports = productoCTRL;