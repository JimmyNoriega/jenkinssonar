const express = require('express');
const jwt = require('jsonwebtoken');
const authByEmailPwd =  require('../helpers/auth');

const app= express.Router();

app.post('/login', async (req, res) => {
    const {email, password, rol}= req.body;

    if (!email || !password) return res.sendStatus(400);
   

        
    const user = authByEmailPwd(email,password,rol);
    if(user==="DATOS INCORRECTOS"){
        console.log("\n ---- INICIO SESSION INCORRECTO -----------\n")
        
        return res.sendStatus(403)
    }
    //generacion token y devolucion
    const token = jwt.sign(user, 'usac_sa', {expiresIn: 20*60});
    console.log("\n ---- INICIO SESSION CORRECTO -----------\n")
    console.log("jwt generado ",token);
    
    return res.json({
        jwt: token
    })


});


app.get('/perfil', ensureToken, (req, res) => {
    jwt.verify(req.token, 'usac_sa', function(err, data) {
        if(err){
            return res.sendStatus(403);
        }else{
            return res.json({
                Texto: "Bienvendio",
                data
            })
        }
        
      });
});


function ensureToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        return res.sendStatus(403);
    }
}






module.exports = app;