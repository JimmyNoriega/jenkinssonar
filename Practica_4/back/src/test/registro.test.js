import asig from '../app.js'
import request from 'supertest'

const registro = {
    "name" :" Mynor",
    "lastname": "Saban",
    "date":"20/05/2010",
    "email" :  "myemail@gmail.com",
    "password" : "contra123"
}

describe('POST / login', ()=>{
       
    test('should respond with a 200 status code', async () => {

        const response = await request(asig).post('/register').send(registro)
        expect(response.statusCode).toBe(200);
    });

});
