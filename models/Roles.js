const mongoose = require('mongoose');
const { Schema } = mongoose;

const ROLES = ["Administrador","Empleado"];

const RoleSchema = new Schema({
    name: String
}, {
    versionKey: false  //Para que no agregue version
});

module.exports = mongoose.model('Role', RoleSchema);