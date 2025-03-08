"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Album, Favoritos
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.fetch_data import get_all_albums # importar las funciones que llaman a la API externa
from sqlalchemy import func
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


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

@api.route('/favoritos', methods =['POST'])
def add_favorito():
    data = request.get_json()
    exist = Favoritos.query.filter_by(title = data.get("title")).first()
    if not exist:
        new_favorito = Favoritos(
        id = data['id'],   
        title=data['title'],
        country=data['country'],
        year=data['year'],
        cover_image=data['cover_image'],
        genre=data['genre'],
        have=data['have']
        )
        db.session.add(new_favorito)
        db.session.commit()
    return jsonify("Favorito añadido")

@api.route('/favoritos/<id>', methods=['DELETE'])
def delete_favorito(id):
    favorito = Favoritos.query.get(id)
    db.session.delete(favorito)
    db.session.commit()
    
    return jsonify({"message": "Favorito eliminado"}), 200
    
@api.route('/favoritos', methods =['GET'])
def get_favorito():
    favoritos = Favoritos.query.all() 
    favoritos_serialized = [favorito.serialize() for favorito in favoritos] 
    return favoritos_serialized   