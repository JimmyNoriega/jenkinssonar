const express = require('express');
const jwt = require('jsonwebtoken');

const app = express.Router();
let contador = 1;
let pedidos = [];

let repartidor = [];

let tiempoTranscurrido = Date.now();
let hoy = new Date(tiempoTranscurrido);


app.put('/recibirPedidoRestaurante', ensureToken, async (req, res) => {
    const { restaurante, cantidad, producto, direccion , nombreR} = req.body;

    if (!restaurante || !cantidad || !producto || !direccion) return res.sendStatus(400);

    jwt.verify(req.token, 'usac_sa', function (err, data) {
        if (err) {
            return res.sendStatus(403);
        } else {

            solicitud = {
                id: contador,
                restaurante,
                fecha_pedido: hoy.toUTCString(),
                producto,
                cantidad,
                direccion,
                estado: "Ingresada",
                cliente: {
                    nombre: data.name,
                    email: data.email,
                    id: data.id
                },
                repartiddor:{
                    nombre:nombreR
                }

            }
            console.log("\n -------------  PEDIDO RECIBIDO DE RESTURANTE ----------------\n");
            console.log(solicitud);

            pedidos.push(solicitud)
            contador++;

            return res.json({
                solicitud
            })
        }

    });

});

app.put('/estadoPedidoRepartidor', ensureToken, async (req, res) => {
    const { idPedido, estado } = req.body;

    if (!idPedido || !estado) return res.sendStatus(400);

    jwt.verify(req.token, 'usac_sa', function (err, data) {
        if (err) {
            return res.sendStatus(403);
        } else {
            for (key of pedidos) {
                if (key.id === idPedido) {
                    let restaurante = key.restaurante
                    let producto = key.producto
                    let fecha_pedido = key.fecha_pedido
                    let direccion = key.direccion
                    key.estado = estado
                    solicitud = {
                        restaurante,
                        producto,
                        direccion,
                        fecha_pedido,
                        fecha_lista: hoy.toUTCString(),
                        estado,
                        cliente: {
                            nombre: data.name,
                            email: data.email,
                            id: data.id
                        }
                    }
                    console.log("\n -------------  CAMBIO DE ESTADO DEL PEDIDO HACIA EL CLIENTE ----------------\n");
                    console.log(solicitud);

                    return res.json(solicitud)

                }
            }
        }


    });


});

app.put('/estadoEntrgadoRepartidor', ensureToken, async (req, res) => {
    const { idPedido } = req.body;

    if (!idPedido || !estado) return res.sendStatus(400);

    jwt.verify(req.token, 'usac_sa', function (err, data) {
        if (err) {
            return res.sendStatus(403);
        } else {
            for (key of pedidos) {
                if (key.id === idPedido) {
                    let restaurante = key.restaurante
                    let producto = key.producto
                    let fecha_pedido = key.fecha_pedido
                    let direccion = key.direccion
                    key.estado = "Entregado"
                    solicitud = {
                        restaurante,
                        producto,
                        direccion,
                        fecha_pedido,
                        fecha_lista: hoy.toUTCString(),
                        estado,
                        cliente: {
                            nombre: data.name,
                            email: data.email,
                            id: data.id
                        }
                    }
                    console.log("\n -------------  PEDIDO ENTREGADO ----------------\n");
                    console.log(solicitud);

                    return res.json(solicitud)

                }
            }
        }


    });


});


app.get('/verPedido', (req, res) => {
    return res.json(pedidos)
});

app.get('/entregaRepartidor', (req, res) => {
    return res.json(repartidor)
});

function ensureToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        return res.sendStatus(403);
    }
}






module.exports = app;