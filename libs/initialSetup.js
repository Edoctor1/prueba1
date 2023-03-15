import Dependencie from '../models/Dependencie';
import Role from'../models/Roles';

export const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount();
        if(count > 0) return;
        const values = await Promise.all([
            new Role({name: "Empleado"}).save(),
            new Role({name: "Administrador"}).save(),
        ]);
        console.log(values);
    } catch (error){
        console.error(error);
    }
};

export const createDependencies = async () => {
    try {
        const count = await Dependencie.estimatedDocumentCount();
        if(count > 0) return;
        const values = await Promise.all([
            new Dependencie({nameDependencie: "Recursos Humanos", phone: 3123211}).save(),
            new Dependencie({nameDependencie: "Fabrica", phone: 3123212}).save(),
            new Dependencie({nameDependencie: "Comercial", phone: 3123213}).save(),
            new Dependencie({nameDependencie: "Gerencia", phone: 3123214}).save(),
        ])
    } catch (error) {
        console.error(error);
    }
}