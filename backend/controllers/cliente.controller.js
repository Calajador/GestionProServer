const Cliente = require('../models/cliente');


clienteCTRL = {};

clienteCTRL.listar = async (req, res) => {

    let clientes = await Cliente.find();

    if(!clientes) {
        res.status(400).json({
            ok: false,
            mensaje:'No hay clientes'
        });
    }

    else {
        res.status(200).json({
            ok:true,
            clientes
        });
    }
}

clienteCTRL.registrar = async (req, res) => {
    let data = req.body;

    let cliente = new Cliente({
        nombre: data.nombre,
        dni: data.dni,
        correo: data.correo,
        puntos: data.puntos
    });

    const result = await cliente.save()
    res.status(200).send(result);
}

clienteCTRL.editar = async (req, res) => {
    let id = req.params.id;
    let data = req.body;

    let clienteUp = await Cliente.findByIdAndUpdate({_id: id}, {
        $set: data
    });

    if(!clienteUp) {
        return res.status(404).json({
            ok: false,
            mensaje: 'No hay cliente'
        });
    };

    res.status(200).json({
        ok: true,
        mensaje: 'Cliente actualizado',
        clienteUp
    });
}

clienteCTRL.obtener_cliente = async (req, res) => {
    let id = req.params.id;

    if(!id) return res.status(401).send({message: 'Error en el Servidor'});

    const cliente = await Cliente.findById({
        _id: id
    });

    res.status(200).send({cliente});
}

clienteCTRL.eliminar = async (req, res) => {
    let id = req.params.id;

    let cliente = await Cliente.findOneAndDelete({
        _id: id
    });

    if(!cliente) {
        return res.status(404).json({
            ok: false,
            mensaje: 'No hay cliente'
        });
    };

    res.status(200).json({
        ok: true,
        mensaje: 'Cliente eliminado'
    });
}


module.exports = clienteCTRL;