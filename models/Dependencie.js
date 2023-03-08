const mongoose = require('mongoose');
const { Schema } = mongoose;

const DEPENDENCIES = ["Recursos Humanos", "Fabrica", "Comercial", "Gerencia"];

const DependencieSchema = new Schema({
    nameDependencie: {type:String, unique: true},
    phone: {type: Number, unique: true}
},{
    versionKey: false  //Para que no agregue version
})

module.exports = mongoose.model('Dependencie', DependencieSchema);