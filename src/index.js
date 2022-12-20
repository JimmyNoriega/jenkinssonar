import app from "./app.js"

//puerto del servidor
const port= 3000;


//inicializa servidor express
app.listen(port, () => console.log(`Server is listening on port ${port}!`));



















/*

const cors = require("cors")
const bodyParser = require("body-parser")
const express = require('express');
const app= express();
const port= 3000;
const router = express.Router()
const registro = require('./registro.js')
const asignacion = require('./asignacion.js')

app.use(cors());

app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
router.post('/registro',registro.Registro);
router.post('/asignation',asignacion.asignacion);

app.use('/',router)


app.listen(port, () => console.log(`Server is listening on port ${port}!`)); */