const jwt = require('jsonwebtoken');
const Role = require('../models/Roles');
const User = require('../models/User');
const { SECRET } = require('../config.js');
//import {SECRET} from '../config.js';
//import Roles from '../models/Roles';

export const verifyToken = async (req, res, next) => {
    //Obtenemos el token
    let token = req.headers["x-access-token"];
    if(!token) return res.status(403).json({ message: "Sin token!" });
    //Verificamos la existencia del token
    try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.id;
    console.log('LLEGA AQUI...');
    // Validar la existencia del Usuario
    const user = await User.findById(req.userId, {password: 0})
    if(!user) return res.satus(404).json({ message: "Usuario no encontrado!" });
    next()
    } catch (error) {
    return res.status(404).json({message: "Sin autorización!"})
    }
    };

    export const isEmployee = async (req, res, next) => {
    const user = await User.findById(req.user.Id)
    const roles = await Role.find({_id: {$in: user.role}})

    for(let i = 0; i < roles.length; i++){
        if(roles[i].name === "Empleado"){
            next()
            return;
        }
    }
    return res.status(403).json({message: "Requiere Rol Empleado!"})
}

export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.user.Id)
    const roles = await Role.find({_id: {$in: user.role}})

    for(let i = 0; i < roles.length; i++){
        if(roles[i].name === "Administrador"){
            next()
            return;
        }
    }
    return res.status(403).json({message: "Requiere Rol Administrador!"})
}