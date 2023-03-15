import { ROLES } from "../models/Roles";
import { DEPENDENCIES } from "../models/Dependencie";

//Crear Roles si no existen en BD
export const checkRolesExisted = (req, res, next) => {
    if(req.body.roles){
        for (let i = 0; i < req.body.roles.length; i++){
            if(!ROLES.incluides(req.body.roles[i])){
                return res.status(400).json({
                    message: `Role ${req.body.roles[i]} no existe`
                })
            }
        }
    }
    next();
}

//Crear Dependencias si no existen en BD
export const checkDependencieExisted = (req, res, next) => {
    if(req.body.dependencie){
        for (let i = 0; i < req.body.dependencie.length; i++){
            if(!DEPENDENCIES.incluides(req.body.dependencie[i])){
                return res.status(400).json({
                    message: `Role ${req.body.dependencie[i]} no existe`
                })
            }
        }
    }
    next();
}