const DetalleVenta = require('../models/detalleventa');
const Venta = require('../models/venta');
const Producto = require('../models/producto');
const Cliente = require('../models/cliente');
const { findById } = require('../models/producto');

ventaCTRL = {};

ventaCTRL.regisctrar = async (req, res) => {
    let data = req.body;

    let venta = new Venta({
        idcliente: data.idcliente,
        iduser: data.iduser
    });

    await venta.save((err, venta_save) => {

        if(venta_save) {
            let detalles = data.detalles;

            detalles.forEach( (element, index) => {
                let detalleventa = new DetalleVenta({
                    idproducto: element.idproducto,
                    idcliente: venta_save.idcliente,
                    cantidad: element.cantidad,
                    idventa: venta_save._id
                });

                 detalleventa.save((err, save_detalles) => {
                    if(save_detalles) {
                         Producto.findById({_id: element.idproducto}, (err, producto_data) => {
                            if(producto_data) {
                                 Producto.findByIdAndUpdate(
                                    {_id:producto_data._id},
                                    {stock: parseInt(producto_data.stock) - parseInt(element.cantidad)},
                                    (err, producto_edit) => {
                                        res.end();
                                    });   
                            }

                            else {
                                res.send(err);
                            }
                        });
                        
                    }

                    else {
                        res.send(err);
                    }
                });
            });
        }

        else {
            res.send(err);
        }
    });
}

ventaCTRL.datos = async (req, res) => {
    let id = req.params.id;

    if(!id) {
    
     return res.status(400).json({
         ok: false,
         message: 'Error en el Servidor'
        });
    }

    const venta = await Venta.findById(
        {_id:id}
    ).populate('idcliente')
     .populate('iduser')
     .exec();

    if(!venta) {

        return res.status(400).json({
            ok: false,
            message: 'Venta no encontrada'
           });
    };

    const detalles = await DetalleVenta.find(
        {idventa: id}
    ).populate('idproducto')
     .exec();

    res.status(200).send({
        data: {
            venta:venta,
            detalles:detalles
        }
    });
    


}

ventaCTRL.listar = async (req, res) => {
    await Venta.find().populate('idcliente').populate('iduser').exec((err,data_ventas)=>{
        if(data_ventas){
            res.status(200).send({ventas:data_ventas});
        }else{
            res.status(404).send({message: "No hay ningun registro de venta"});
        }
    });   
};

ventaCTRL.detalles = async (req, res) => {
    let id = req.params['id'];

   await DetalleVenta.find({idventa: id}).populate('idproducto').populate('idcliente').exec((err,data_detalles)=>{
        if(data_detalles){
            res.status(200).send({detalles:data_detalles});
        }else{
            res.status(404).send({message: "No hay ningun registro de venta"});
        }
    });

}

module.exports = ventaCTRL;