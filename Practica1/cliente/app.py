from flask import jsonify,request,Flask
from flask_cors import CORS
import jwt
import json

#Get database
f = open('data.json')
data = json.load(f)
usuarios = data['users']
restaurantes = data['restaurante']
repartidores = data['repartidor']

app = Flask(__name__)
cors = CORS(app)
numPedido = 10


#JWT
def authenticate(token):
    usuario = jwt.decode(token,"usac_sa",algorithms=["HS256"])
    return usuario

#Rutas
@app.route('/ping',methods=['GET'])
def pong():
    return jsonify({"msg":"Pong!"})

@app.route('/cliente/solicitar',methods=['POST'])
def clientePedido():
    global numPedido
    if request.method == 'POST':
        token = request.headers['authorization']
        token = token.split()
        body = request.get_json()
        usuario = authenticate(token[1])
        if usuario is not None:
            if usuario['rol']=='Cliente':
                pedido = {
                    "id_restaurante":body,
                    "estado":"Pendiente",
                    "id_pedido":numPedido,
                    "id_cliente":usuario['id']                }
                numPedido = numPedido+1
                restaurantes.append(pedido)
                print('--------PEDIDO AGREGADO EXITOSAMENTE--------')
                return jsonify({"msg":"exito"})
            else:
                print('--------ERROR DE AUTENTICACION --------')
                return jsonify({'error':'Rol no valido'})
        else:
            print('--------ERROR USUARIO NO ENCONTRADO-----------')
            return jsonify({"message":"error usuario no encontrado"})
    else:
        print('--------ERROR METODO HTTP --------')
        return jsonify({"message":"error de método http"})

@app.route('/cliente/restaurante',methods=['POST'])
def clienteRestaurante():
    if request.method == 'POST':
        token = request.headers['authorization']
        token = token.split()
        body = request.get_json()
        usuario = authenticate(token[1])
        if usuario is not None:
            if usuario['rol']=='Cliente':
                #Se obtiene pedido
                pedido = next((p for p in  restaurantes if p['id_pedido']==body['id_pedido']))
                if(pedido is not None):
                    print('----------EL PEDIDO TIENE ESTADO: '+pedido['estado']+"----------")
                    return jsonify({'msg':'Pedido encontrado'})
                else:
                    print('--------ERROR, NO SE ENCONTRO EL PEDIDO--------')
                    return({"error":"No se encontró el pedido"})    
            else:
                print('--------ERROR DE AUTENTICACION --------')
                return jsonify({'error':'Rol no valido'})
        else:
            print('--------ERROR USUARIO NO ENCONTRADO-----------')
    else:
        print('--------ERROR METODO HTTP --------')
        return jsonify({"message":"error de método http"})

@app.route('/cliente/repartidor',methods=['POST'])
def clienteRepartidor():
    if request.method == 'POST':
        token = request.headers['authorization']
        token = token.split()
        body = request.get_json()
        usuario = authenticate(token[1])
        if usuario is not None:
            if usuario['rol']=='Cliente':
                #Se obtiene pedido
                pedido = next((p for p in  repartidores if p['id_pedido']==body['id_pedido']))
                if(pedido is not None):
                    print('----------EL PEDIDO TIENE ESTADO: '+pedido['estado']+"----------")
                    return jsonify({'msg':'Pedido encontrado'})
                else:
                    print('--------ERROR, NO SE ENCONTRO EL PEDIDO--------')
                    return({"error":"No se encontró el pedido"})    
            else:
                print('--------ERROR DE AUTENTICACION --------')
                return jsonify({'error':'Rol no valido'})
        else:
            print('--------ERROR USUARIO NO ENCONTRADO-----------')
    else:
        print('--------ERROR METODO HTTP --------')
        return jsonify({"message":"error de método http"})


if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0',port='3010')
