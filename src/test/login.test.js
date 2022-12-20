import asig from '../app.js'
import request from 'supertest'

const User = {

    "email" :  "myemail@gmail.com",
    "password" : "contra123"
}

describe('POST / login', ()=>{
       
    it('Register successfully', function(done) {
        request(asig)
          .post('/login')
          .send(User)
          .expect(200, done);
      });
    
    it('Login, bad email', function(done) {
      request(asig)
        .post('/login')
        .send({...User,email: 'holi.cpm'})
        .expect(401, done);
    });

    it('Empty password', function(done) {
      request(asig)
        .post('/login')
        .send({...User,password: ''})
        .expect(401, done);
    });

    it('Empty password and email fields', function(done) {
      request(asig)
        .post('/login')
        .send({...User,password: '',email:''})
        .expect(401, done);
    });

});
