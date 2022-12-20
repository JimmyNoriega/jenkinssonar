const express = require('express');
const repartidor = require('./routes/repartidor')
const port = 3300;
const app = express();

app.use(express.json());
app.use(express.text());

app.use(repartidor);

app.listen(port,()=>
    console.log('listening on port 3300')
);