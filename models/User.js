const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');
const validator = require('validator');

const UserSchema = new Schema({
    names: { type: String},
    surNames: {type: String},
    cellPhone: {type: Number},
    email: {type: String,
            required: true,
            unique: true,
            lowercase: true,
            validate: (value) => {
                return validator.isEmail(value);
    }},
    password : {type: String},
    dependencie: [{
        ref: "Dependencie",
        type: Schema.Types.ObjectId
    }],
    state: { type: String},
    role: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }]
},{
    timestamps: true,
    versionKey: false
});
UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10); //Forma de aplicar un algoritmo
    return await bcrypt.hash(password, salt); //Contraseña Cifrada
};

UserSchema.statics.comparePassword = async (password, receivedPassword) => {
    await bcrypt.compare(password, receivedPassword)
};
/*
module.exports.comparePassword = async (password, receivedPassword) => {
    try {
        return await bcrypt.compare(password, receivedPassword);
    } catch (error) {
        throw new Error("Comparison failed", error);
    }};*/

module.exports = mongoose.model('User', UserSchema);