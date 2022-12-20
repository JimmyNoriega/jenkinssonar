const USERS = require('../db');

const authByEmailPwd = (email, password, rol) => {
    const user = USERS.find((user) => user.email === email);
    if (user.password === password && user.rol=== rol){
      return user;
    }
    return "DATOS INCORRECTOS";
  };
  
module.exports= authByEmailPwd;

