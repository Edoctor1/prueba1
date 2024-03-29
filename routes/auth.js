const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');
const role = require('../models/Roles');
const { authJwt, verifySignup } = require('../middlewares');
//import { authJwt, verifySignup } from "../middlewares"

router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers", "x-access-token, Origin, Conten-Type, Accept"
    );
    next();
});

//const passport = require('passport');

router.post("/auth/login", async (req, res) => {
    try {
    const userInfo = await User.findOne();
    const userFound = await User.findOne({email: req.body.email}).populate("role");
    if(!userFound) return res.status(400).json({message: "Usuario no encontrado"})
    const matchPassword = await User.comparePassword(req.body.password, userFound.password)
    /*if(!matchPassword) return res.status(400).json({token: null, message: "Contraseña Invalida"})*/
    const token = jwt.sign({id: userFound._id}, process.env.vidly_jwtPrivateKey,{
       expiresIn: 86400
    })
    
    res.status(200).json({
        userInfo,
        token
    })
    } catch (error) {
    console.error(error);
    }
})


module.exports = router;