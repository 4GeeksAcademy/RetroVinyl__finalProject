"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Album, Favorito, Comentario, User, Pedido
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.fetch_data import get_all_albums # importar las funciones que llaman a la API externa
from sqlalchemy import func
api = Blueprint('api', __name__)
from flask_jwt_extended import jwt_required, current_user
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import stripe
import os

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/register', methods=['POST'])
def register():
    processed_params = request.get_json()
    print("PARAMS", processed_params)

    # Verificar si el correo electrónico ya existe en la base de datos
    existing_user = User.query.filter_by(email=processed_params['email']).first()
    if existing_user:
        return jsonify({"error": "Email already exists"}), 400  # Retorna un error si ya existe

    # Crear el nuevo usuario
    new_user = User(email=processed_params['email'], is_active=True)
    new_user.set_password(processed_params['password'])

    # Guardar el usuario en la base de datos
    db.session.add(new_user)
    db.session.commit()

    return jsonify([{"msg": "User was created"}]), 201  # 201 código de creación exitosa



@api.route('/login', methods=['POST'])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).one_or_none()

    if not user or not user.check_password(password):
        return jsonify("Wrong username or password"), 401
    
    acces_token = create_access_token(identity=user)
    return jsonify({"access_token": acces_token, "user_id": user.id})


@api.route('/perfil', methods=['GET'])
@jwt_required()
def get_current_user():
     # Obtener al usuario actual usando el JWT
    current_user = User.query.filter_by(id=get_jwt_identity()).first()
    
    if not current_user:
        return jsonify({"msg": "User not found"}), 404

    return jsonify(current_user.serialize()), 200

@api.route('/perfil', methods=['POST'])
@jwt_required()
def create_user():
    # Obtener los datos del perfil del usuario desde el JSON de la solicitud
    processed_params = request.get_json()

    # Obtener el ID del usuario autenticado (deberías asociarlo al perfil)
    user_id = get_jwt_identity()  # Obtener el ID del usuario autenticado desde el token

    # Obtener los parámetros del perfil
    name = processed_params.get('name', None)
    sur_name = processed_params.get('sur_name', None)
    username = processed_params.get('username', None)
    mobile_number = processed_params.get('mobile_number', None)
    post_code = processed_params.get('post_code', None)
    state = processed_params.get('state', None)
    country = processed_params.get('country', None)
    region_state = processed_params.get('region_state', None)

    # Verificar si el usuario ya tiene un perfil creado
    existing_user = User.query.filter_by(id=user_id).first()
    if not existing_user:
        return jsonify({"msg": "User not found"}), 404

    # Actualizar el perfil del usuario
    existing_user.name = name
    existing_user.sur_name = sur_name
    existing_user.username = username
    existing_user.mobile_number = mobile_number
    existing_user.post_code = post_code
    existing_user.state = state
    existing_user.country = country
    existing_user.region_state = region_state

    db.session.commit()  # Guardar los cambios en la base de datos

    return jsonify({"msg": "Profile created successfully"}), 201



@api.route('/perfil', methods=['PUT'])
@jwt_required()
def update_profile_user():
    current_user = User.query.filter_by(id=get_jwt_identity()).first()
    
    if current_user is None:
        return jsonify({"error": "User not found"}), 404  # Asegúrate de que el usuario existe
    
    processed_params = request.get_json()  # Obtener los nuevos datos
    
    # Actualizar los campos del usuario
    if 'name' in processed_params:
        current_user.name = processed_params['name']
    if 'sur_name' in processed_params:
        current_user.sur_name = processed_params['sur_name']
    if 'username' in processed_params:
        current_user.username = processed_params['username']
    if 'mobile_number' in processed_params:
        current_user.mobile_number = processed_params['mobile_number']
    if 'post_code' in processed_params:
        current_user.post_code = processed_params['post_code']
    if 'state' in processed_params:
        current_user.state = processed_params['state']
    if 'country' in processed_params:
        current_user.country = processed_params['country']
    if 'region_state' in processed_params:
        current_user.region_state = processed_params['region_state']
    
    db.session.commit()  # Guardar los cambios en la base de datos
    
    return jsonify({"msg": "Profile updated successfully"}), 200




@api.route('/get-albums', methods=['GET']) # Crear un end-point de tipo get para traer la informacion de la API externa
def llamada_api(): #Funcion que ejecuta las demas funciones importadas mas arriba
    get_all_albums()
        
    return jsonify("Albumes creados"), 200 #mensaje si la llamada es exitosa

@api.route('/get-albums-db', methods=['GET']) # Crear un end-point de tipo get para traer la informacion de la base de datos
def get_albums(): #Funcion que ejecuta las demas funciones importadas mas arriba
    albumes = Album.query.all() 
    albumes_serialized = [album.serialize() for album in albumes] # COMO SE LLAMA AL FRONT??????
    return albumes_serialized

@api.route('/albums/<decada>/<genero>', methods = ['GET']) # Ruta que conecta el back con el front (Despliegue albums.js useEffect linea 11)
def get_albums_by_decada_and_genero(decada, genero):
    decada_start = int(decada) + 1900 #convertimos el parametro recibido en un int(numero) y le sumamos 1900 para obtener el año
    decada_end = decada_start + 9 # la decada de busqueda final seria igual a la inicial mas nueve ( 1960 + 9 = 1969)
    genre = genero.strip().lower() # guardamos el parametro del genero haciendo que ignore los espacios y las mayúsculas  
    albums = Album.query.filter(
        db.cast(Album.year, db.Integer).between(decada_start, decada_end) # Filtra los años por los parametros decada_start y decada_end, cast() transfomara cualquier string en int
        ).all()  
    filtered_albums = [
        album for album in albums 
        if genre in [g.strip().lower() for g in album.genre.replace('/', ',').split(',')] # Recibe los albumes filtrados por año y remplaza el / y la , de los genreros solo por ,
    ]
    return jsonify([album.serialize() for album in filtered_albums])  # crea un diccionario añadiendo la propiedad jsonify para convertirlo en json

@api.route('/favoritos', methods=['POST'])
@jwt_required()
def add_favorito():
    data = request.get_json()
    current_user_id  = get_jwt_identity()
    album_id = data.get("id_album")
    
    if not album_id:
        return jsonify({"error": "El id del álbum es requerido"}), 400

    # Verificar si el álbum ya está en los favoritos del usuario
    exist = Favorito.query.filter_by(id_usuario = current_user_id, id_album=album_id).first()
    if exist:
        return jsonify({"error": "El álbum ya está en favoritos"}), 400

    new_favorito = Favorito(
        id_album=album_id,
        id_usuario= current_user_id
    )
    db.session.add(new_favorito)
    db.session.commit()
    return jsonify({"msg": "Favorito añadido"}), 201


@api.route('/favoritos/<id>', methods=['DELETE'])
@jwt_required()
def delete_favorito(id):
    current_user_id = get_jwt_identity()
    favorito = Favorito.query.filter_by(id_usuario = current_user_id, id_album = id).first()
    if not favorito : 
        return jsonify({"error" : "el album no esta en los favoritos del usuario"}), 404
    db.session.delete(favorito)
    db.session.commit()
    
    return jsonify({"message": "Favorito eliminado"}), 200
    
@api.route('/favoritos', methods=['GET'])
@jwt_required()
def get_favorito():
    current_user_id = get_jwt_identity()
    favoritos = Favorito.query.filter_by(id_usuario = current_user_id).all()
    favoritos_serialized = [favorito.serialize() for favorito in favoritos]
    return jsonify(favoritos_serialized), 200  

@api.route('/infoAlbums/<albumid>', methods = ['GET']) # Ruta que conecta el back con el front (Despliegue albums.js useEffect linea 11)
def get_albums_by_id(albumid):
    album_selected = Album.query.filter_by(id=albumid).first()
    return jsonify(album_selected.serialize())


@api.route('/search', methods=['GET'])
def search():
    query = request.args.get('query')  #permite obtener valores individuales de la url     
    if query:
        # Filtra los resultados según el título del álbum
        results = Album.query.filter(Album.title.ilike(f'%{query}%')).all() #ilike sirve para consultar datos sin distinguir entre mayusculas y minusculas
        print(f"Resultados encontrados: {len(results)}")
        for album in results:
            print(f"- {album.title}")
    else:
        results = [] #si esta vacío no se devuelve ninguna búsqueda
    
    return jsonify([album.serialize() for album in results])

@api.route('/comentariosAlbum', methods =['POST'])
@jwt_required()
def add_comentario():
    current_user_id = get_jwt_identity()
    data = request.get_json()

    new_comentario = Comentario(
        album_id = data['album_id'],
        #user_id = data['user_id'],
        user_id = current_user_id,
        texto = data['comentario']
        )
    db.session.add(new_comentario)
    db.session.commit()
    return jsonify("Comentario añadido")

@api.route('/comentariosAlbum/<albumid>', methods=['GET'])
@jwt_required()
def get_comentarios(albumid):
    comentarios = Comentario.query.filter_by(album_id=albumid).all()
    
    if not comentarios:
        return jsonify({"message": "No hay comentarios para este álbum"}), 404

    return jsonify([comentario.serialize() for comentario in comentarios]), 200

@api.route('/comentariosAlbum/<comment_id>', methods=['DELETE'])
@jwt_required()
def delete_comentario(comment_id):
    # Se obtiene el id del usuario autenticado desde el token
    current_user_id = get_jwt_identity()
    
    # Se busca el comentario por su id
    comentario = Comentario.query.get(comment_id)
    if not comentario:
        return jsonify({"error": "Comentario no encontrado"}), 404

    # Se verifica que el comentario pertenezca al usuario autenticado
    if comentario.user_id != current_user_id:
        return jsonify({"error": "No tienes permiso para eliminar este comentario"}), 403

    # Se elimina el comentario y se guarda el cambio en la base de datos
    db.session.delete(comentario)
    db.session.commit()
    
    return jsonify({"message": "Comentario eliminado exitosamente"}), 200

#load_dotenv()
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
#stripe.api_key ="sk_test_51QvwkbG1uRRpZkNMj0OK53sniI9UWfdh7kp6uVSgOzqpBwVLwLjL0rnXxnP5iyuXjZfa6yLFippZ5h8PHIhmdwkG00vFqfXzuH"

@api.route('/create-payment-intent', methods=['POST'])
def create_payment_intent():
    try:
        data = request.get_json()
        # Se espera que el monto venga en centavos. Ejemplo: 20€ -> 2000 centavos
        amount = data.get("amount")
        if not amount:
            return jsonify({"error": "El monto es requerido"}), 400

        intent = stripe.PaymentIntent.create(
            amount=int(amount * 100), # Convierte nuestro precio a centavos
            currency='eur',
            automatic_payment_methods={'enabled': True},
        )
        return jsonify({'clientSecret': intent.client_secret})
    except Exception as e:
        return jsonify({"error": str(e)}), 403
    
@api.route('/pedidos', methods =['POST'])
@jwt_required()
def add_pedido():
    data = request.get_json()
    current_user_id = get_jwt_identity()
    new_pedido = Pedido(
        album_id = data['album_id'],   
        user_id = current_user_id,
        precio_total = data['precio_total'],
        cantidad = data['cantidad']
    )
    db.session.add(new_pedido)
    db.session.commit()
    return jsonify("Pedido añadido")
