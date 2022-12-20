

import express from 'express';
import bodyParser from "body-parser";

import validator from "validator";

const app = express();


app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

app.post('/login',(req, res) =>{
    const {email, password} = req.body;
    if(!validator.isEmail(email)){
        res.status(401);
        res.json({
            message: 'invalid email address'
        });
    } else if(password.length < 8){
        res.status(401);
        res.json({
            message: 'password must be at least 8 characters'
        });
    }else{
        res.status(200);
        res.json({
            email: email,
            password: password,
            message: 'login successfully'
        });
    }

});


app.post('/register',(req, res) =>{
    const {name,lastname, email,date,password} = req.body;

    res.status(200);
    res.json({id: Math.floor(Math.random() * (1000 - 1) + 1), name: name,
        lastname: lastname, email: email, 
        date: date, password: password,
        message: 'Register successfully'
    });
});

app.post('/asignation',(req, res) =>{
    const {student,course,section,day,hour} = req.body;

    res.status(200)
    res.json({
        id: Math.floor(Math.random() * (1000 - 1) + 1),
        student: student,course: course,
        section: section, day: day, hour: hour, 
        message: 'asignation successfully'
    });

});



export default app;




