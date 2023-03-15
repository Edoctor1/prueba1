const express = require('express');
const router = express.Router();
const { authJwt, verifySignup } = require('../middlewares');
//import { authJwt } from '../middlewares';

const Dependencie = require('../models/Dependencie');

router.get('/dependencies', [authJwt.verifyToken, authJwt.isAdmin], async (req, res) => {
    const dependencies = await Dependencie.find().sort({_id:'desc'});
    res.status(200).json(dependencies)
})

router.post('/dependencies/new-dependencie', [authJwt.verifyToken, authJwt.isAdmin], async (req, res) => {
    try {
        const { nameDependencie, phone } = req.body;
        const errors = [];
        if(!nameDependencie){
            errors.push({ text: 'Por favor Agregue una dependencia!' })
        }
        if(!phone){
            errors.push({ text: 'Por favor ingrese el número de telefono' })
        }
        if(phone.length > 7){
            errors.push({ text: 'Maximo 7 Caracteres' })
        }
         else {
            const newDependencie = new Dependencie({
                nameDependencie, phone
            });
            await newDependencie.save();
            res.status(200).json({
                nameDependencie : nameDependencie,
                phone: phone    
            });
        }
    } catch (error) {
        console.error(error);
    }  
});

module.exports = router;