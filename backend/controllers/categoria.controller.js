const Categoria = require('../models/categoria');

categoriaCTRL = {};

categoriaCTRL.registrar = async (req, res) => {

    let data = req.body;

    let categoria = new Categoria({
        titulo: data.titulo,
        descripcion: data.descripcion
    });

     await categoria.save((err, result) => {
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
                res.status(403).send('La categoria no se ha podido registrar');
            }
          }
     });

    
}

categoriaCTRL.obtener_categoria = async (req, res) => {
    let id = req.params.id;

    if(!id) return res.status(400).send({message: 'Error en el Servidor'});

    const categoria = await Categoria.findById({
        _id: id
    });

    res.send(categoria);
}

categoriaCTRL.editar = async (req, res) => {
    let id = req.params.id;
    let data = req.body;

    let categoriaUp = await Categoria.findByIdAndUpdate({_id: id}, {
        $set: data
    });

    if(!categoriaUp) {
        return res.status(404).json({
            ok: false,
            mensaje: 'No hay categoria'
        });
    };

    res.status(200).json({
        ok: true,
        mensaje: 'Categoria actualizada',
        categoriaUp
    });

}

categoriaCTRL.eliminar = async (req, res) => {
    let id = req.params.id;

    let categoria = await Categoria.findOneAndDelete({
        _id: id
    });

    if(!categoria) {
        return res.status(404).json({
            ok: false,
            mensaje: 'No hay categoria'
        });
    };

    res.status(200).json({
        ok: true,
        mensaje: 'Categoria eliminada'
    });


}

categoriaCTRL.listar = async (req, res) => {
    let nombre = req.params.nombre;

    let categoria = await Categoria.find({
        titulo: new RegExp(nombre, 'i')
    });

    if(!categoria) {
        return res.status(404).json({
            ok: false,
            mensaje: 'No hay categoria'
        });
    };

    res.send(categoria);
}
module.exports = categoriaCTRL;