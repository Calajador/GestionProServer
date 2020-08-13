const Proveedores = require('../models/proveedores');

const proveedoresCtrl = {};

proveedoresCtrl.crearProveedor = async (req, res) => {
    let data = req.body;
    let proveedor = new Proveedores ({
        nombre: data.nombre,
        persona_contacto: data.persona_contacto,
        descripcion: data.descripcion,
        email: data.email,
        satisfaccion: data.satisfaccion,
        problemas: data.problemas,
        ventas: data.ventas,  
    });

    await proveedor.save();
    res.status(200).json({
        ok: true,
        proveedor
    });
}

proveedoresCtrl.getProveedores = async (req, res) => {
    let proveedores = await Proveedores.find();

    if(!proveedores) {
        res.status(400).json({
            ok: false,
            mensaje:'No hay proveedores'
        });
    }

    else {
        res.status(200).json({
            ok:true,
            proveedores
        });
    }
}

proveedoresCtrl.upProveedor = async (req, res) => {

    let proveedor = await Proveedores.findOneAndUpdate({
        _id: req.params.provId
    },
    {
        $set:req.body
    });

    if(!proveedor) {

        res.status(404).json({
            ok:false,
            mensaje: 'No se encuentra el proveedor'
        });
    }

    else {

        res.status(200).json({
            ok: true,
            mensaje: 'Proveedor Actualizado',
            proveedor
        });
    }
}

proveedoresCtrl.obtener = async (req, res) => {
    let id = req.params.id;

    if(!id) return res.status(401).send({message: 'Error en el Servidor'});

    const proveedor = await Proveedores.findOne(
        {_id: id}
    );

    res.status(200).send({proveedor});
}

proveedoresCtrl.deleteProveedor = async (req, res) => {

    let proveedor = await Proveedores.findOneAndRemove({
        _id: req.params.provId
    });

    if(!proveedor) {

        res.status(404).json({
            ok:false,
            mensaje: 'No se encuentra el proveedor'
        });
    }

    else {

        res.status(200).json({
            ok: true,
            mensaje: 'Proveedor Eliminado'
        });
    }

}

module.exports = proveedoresCtrl;