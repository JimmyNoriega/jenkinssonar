const express = require('express');
const restaurante = require('./routes/restaurante')
const port = 3300;
const app = express();

app.use(express.json());
app.use(express.text());

app.use(restaurante);

app.listen(port,()=>
    console.log('listening on port 3300')
);