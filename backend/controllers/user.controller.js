const User = require('../models/user');
const userCTRL = {};

userCTRL.registrar = async (req, res) => {
    let user = await User.findOne({email: req.body.email});

    if(user) 
    {
        return res.status(400).json({
            ok:false,
            mensaje: 'Este usuario ya existe'
        });
    }

    user = new User({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        email: req.body.email,
        password: req.body.password,
        role:  req.body.role
    });

    user.password = await user.encryptPassword(user.password);
    const result = await user.save();

    res.status(200).json({
        ok: true,
        mensaje: 'Usuario registrado',
        User: result
    });
}

userCTRL.login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email: email}); // Comprobamos si el email existe
    const validPassword = await user.validatePassword(password); //Comprobamos que la password coincide

    //Si NO se encuentra el usuario
    if(!user) return res.status(400).send('Usuario No encontrado');
    
    //Si la password NO coincide
    if(!validPassword) return res.status(400).send('Password Incorrecta');


    const token = user.generateKJWT();
    // Si todo esta bien lo devolvemos
    res.status(200).json({
        ok:true,
        user,
        token
    });

}

userCTRL.listar = async (req, res) => {

    let users = await User.find();

    if(!users) {
        res.status(400).json({
            ok: false,
            mensaje:'No hay usuarios'
        });
    }

    else {
        res.status(200).json({
            ok:true,
            users
        });
    }
}

userCTRL.obtener = async (req, res) => {
    let id = req.params.id;

    if(!id) return res.status(401).send({message: 'Error en el Servidor'});

    const user = await User.findOne(
        {_id: id}
    );

    res.status(200).send({user});
}

userCTRL.upUser = async (req, res) => {

    let id = req.params.id;
    let user = await User.findOneAndUpdate({
        _id: id
    },
    {
        $set:req.body
    });

    if(!user) {

        res.status(404).json({
            ok:false,
            mensaje: 'No se encuentra el usuario'
        });
    }

    else {

        res.status(200).json({
            ok: true,
            mensaje: 'Usuario Actualizado',
            user
        });
    }
}

userCTRL.deleteUser = async (req, res) => {
    let id = req.params.id;
    let user = await User.findByIdAndRemove({
        _id: id
    })

    if(!user) {

        res.status(404).json({
            ok:false,
            mensaje: 'No se encuentra el usuario'
        });
    }

    else {

        res.status(200).json({
            ok: true,
            mensaje: 'Usuario Eliminado',
        });
    }
}


module.exports = userCTRL