import users from "../routes/users";
import request from 'supertest';
import { token } from "morgan";

//Conjunto de peticiones para comprobar si la ruta de auth funciona:
//PETICIONES GET
describe('GET / users', () => {
    test('El test debería responder con un codigo de estado 200', async () =>{
        const response = await request(users).get('/users').send()
        expect(response.statusCode).toBe(200);
    });
    test('El test debería responder con un arreglo', async () => {
        const response = await request(users).get('/users').send()
        expect(response.body).toBeInstanceOf(Object);
    });
});

//Peticiones POST
describe('POST / users', () => {
    describe('NewUser', () =>{
        const newUser = {
        "names": "Empleado Test",
        "surNames": "Test Test",
        "cellPhone": "3043659100",
        "email": "empleadoT@mail.com",
        "password": "Pruebas123",
        "dependencie": ["6411f0350d1068012e37b0ac"],
        "state": "Activo",
        "rol": ["Empleado"]
        };

        test('El test debería responder con un codigo de estado 200', async () =>{
            const response = await request(users).post('/users/add').send(newUser)
            expect(response.body.id).toBeDefined();
        });
        //Comprobar Headear content-type
        test('El test debería contener las cabeceras', async () =>{
            const response = await request(users).post('/users/add').send(newUser);
            expect(response.headers["content-type"]).toEqual(
                expect.stringContaining("json")
            );
        });
         /*Comprobar el header
        test('El test debería contener las cabeceras', async () =>{
            const response = await request(users).post('/users/add').send(newUser);
            expect(response.headers["x-access-token"]).toEqual(
                expect.stringContaining(`${token}`)
            );
        });*/
    });
describe('Cuando los campos Obligatorios no son incluidos', () => {
    test('El test deberia responder 400 statusCode', async () =>{
        const fields = [
            {},
            {email: ""},
            {names: ""}
        ];
        for(const body of fields){
        const response = await request(users).post('/users/add').send(body);
        expect(response.statusCode).toBe(400);
        }
    })
})
});
    //esto deberia responder con un UserId


    //comprobar si responde con un jsonObject una nueva petición con un objectID

    
