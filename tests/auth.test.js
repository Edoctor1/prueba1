import auth from '../routes/auth'
import request from 'supertest'

describe('POST /auth', () => {
    describe("auth", () =>{
        const authLogin = {
            email: "admin5@mail.com",
            password: "Pruebas123"
        };
    test('El test debería responder con un codigo de estado 200', async () =>{
        const response = await request(auth).post('/auth/login').send(authLogin)
        expect(response.body.id).toBeDefined();
        });
    test('El test debería contener las cabeceras', async () =>{
        const response = await request(auth).post('/auth/login').send(authLogin);
        expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
        );
        });
    });
describe('Cuando los campos Obligatorios no son incluidos', () => {
    test('El test deberia responder 400 statusCode', async () =>{
        const fields = [
            {},
            {email: ""},
            {paswword: ""}
            ];
        for(const body of fields){
        const response = await request(auth).post('/auth/login').send(body);
        expect(response.statusCode).toBe(400);
        }
     });
  });
});