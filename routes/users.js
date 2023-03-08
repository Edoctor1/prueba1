const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
import config from '../config';
import { authJwt, verifySignup } from "../middlewares"
import Dependencie from '../models/Dependencie';
//const { check } = require('express-validator');
const Role = require('../models/Roles');
const User = require('../models/User');



//Obtener Lista de usuarios
router.get("/users", [authJwt.verifyToken, authJwt.isAdmin, authJwt.isEmployee],  async (req, res) => {
    const users = await User.find().sort({_id:'desc'});
    res.status(200).json(users);
});

router.get("/users/v2", authJwt.verifyToken, async (req, res) => {
    const users2 = await User.find({ names: req.body.name, email: req.params.email, dependencie: req.params.dependencie }).sort().exec();
    res.status(200).json({users2});
})

//Obtener un usuario
router.get("/users/especificUser/:id", authJwt.verifyToken, async (req, res) => {
    const especificUser = await User.findById(req.params.id);
    res.status(200).json(especificUser);
})

//Crear Usuario
router.post("/users/add", [authJwt.verifyToken, authJwt.isAdmin], async (req, res) => {
    const { names, surNames, cellPhone, email, password, dependencie, state, roles } = req.body;
    const errors = [];
    if(!names){
        errors.push({ text: 'Este campo es obligatorio' });
    }
    if(names.length < 3) {
        errors.push({ text: 'El campo debe contener almenos 3 caracteres' });
    }
    if(!password){
        errors.push({ text: 'Este campo es obligatorio' });
    }
    if(password.length < 4){
        errors.push({ text: 'La contraseña debe ser mayor a 4 caracteres' });
    } else{
        const emailUser = await User.findOne({email: email});
        if(emailUser){
            req.flash("error_msg", "El email registrado se encuentra en uso");
        }
    }
    const newUser = new User({ names, surNames, cellPhone, email, password, dependencie, state, roles });
    if(roles) {
        const foundRoles = await Role.find({name: {$in: roles}})
        newUser.roles = foundRoles.map(role => role._id)
    } else {
        const role = await Role.findOne({name: "Empleado"})
        newUser.roles = [role._id];
    }
    if(dependencie){
        const foundDependencies = await Dependencie.find({nameDependencie: {$in: dependencie}})
        newUser.dependencie = foundDependencies.map(dependencie => dependencie._id)
    } else {
        const dependencie = await Dependencie.findOne({nameDependencie:"Fabrica"})
        newUser.dependencie = [dependencie._id];
    }
    newUser.password = await newUser.encryptPassword(password);
    const savedUser = await newUser.save();
    const token = jwt.sign({id: savedUser._id}, config.SECRET, {
        expiresIn: 86400 //24 hrs en segundos
    })
    req.flash("success_msg", "Usuario Registrado")
    res.status(201).json({
        names : names,
        surNames: surNames,
        cellPhone: cellPhone,
        email: email,
        password : password,
        dependencie: dependencie,
        state: state,
        roles: roles
    })
});
router.post("/users/add", [
    authJwt.verifyToken,
    authJwt.isAdmin,
    verifySignup.checkRolesExisted
]);
//Editar Usuario
router.put("/users/edit-user/:id", [authJwt.verifyToken, authJwt.isAdmin], async (req, res) => {
    const { names, surNames, cellPhone, email, password, dependencie, state, role } = req.body;
    await User.findByIdAndUpdate(req.params.id, { names, surNames, cellPhone, email, password, dependencie, state, role });
    req.flash('success_msg', 'Usuario Actualizado satisfactoriamente');
    res.status(200).json({
        names : names,
        surNames: surNames,
        cellPhone: cellPhone,
        email: email,
        password : password,
        dependencie: dependencie,
        state: state,
        role: role
    });
})
//Eliminar Usuario
router.delete("/users/delete/:id", [authJwt.verifyToken, authJwt.isAdmin], async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Usuario Eliminado");
    res.status(200).json({
        mensaje: "Usuario Eliminado"
    });
})


module.exports = router;