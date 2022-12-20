const express = require('express');
const login = require('./routes/login')
const port = 3100;
const app = express();

app.use(express.json());
app.use(express.text());

app.use(login);

app.listen(port,()=>
    console.log('listening on port 3100')
);