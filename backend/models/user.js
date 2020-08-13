const mongoose = require('mongoose');
const {Schema} = mongoose;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');


const UserSchema = new Schema({
    nombre: String,
    apellidos: String,
    email: String,
    password: String,
    role:  String
});

UserSchema.methods.generateKJWT = function () {
    return jwt.sign({
        _id: this._id,
        nombre: this.nombre,
        apellidos: this.apellidos,
        password: this.password,
        role: this.role
    }, config.secret);
}

UserSchema.methods.encryptPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

UserSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
