import app from "../app";
import request from 'supertest';

//Conjunto de peticiones para comprobar si las rutas funcionan
describe('GET / app', () => {
    test('El test debería responder con un codigo de estado 200', async () =>{
        const response = await request(app).get('/').send()
        expect(response.statusCode).toBe(200);
    });
    test('El test debería responder con un arreglo', async () => {
        const response = await request(app).get('/').send()
        expect(response.body).toBeInstanceOf(Array);
    })
})