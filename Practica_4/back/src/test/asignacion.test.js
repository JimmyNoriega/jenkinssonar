import asig from '../app.js'
import request from 'supertest'

const asignacion = {

    "student" :  "Mynor",
    "course": "Mathematics",
    "section" :"A",
    "day": "Monday",
    "hour": "12:00 PM"
}

describe('POST / asignacion', ()=>{
       
    test('should respond with a 200 status code', async () => {

        const response = await request(asig).post('/asignation').send(asignacion)

        expect(response.statusCode).toBe(200);
    });

});
