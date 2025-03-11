"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Album, Favorito, Comentario
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
    exist = Favorito.query.filter_by(id_usuario = 1, id_album = data.get("id_album")).first()
    if not exist:
        new_favorito = Favorito(
        id_album = data['id_album'],   
        id_usuario = 1
        )
        db.session.add(new_favorito)
        db.session.commit()
    return jsonify("Favorito añadido")

@api.route('/favoritos/<id>', methods=['DELETE'])
def delete_favorito(id):
    user_id = 1
    favorito = Favorito.query.filter_by(id_usuario = user_id, id_album = id).first()
    if not favorito : 
        return jsonify({"error" : "el album no esta en los favoritos del usuario"}), 404
    db.session.delete(favorito)
    db.session.commit()
    
    return jsonify({"message": "Favorito eliminado"}), 200
    
@api.route('/favoritos', methods =['GET'])
def get_favorito():
    favoritos = Favorito.query.filter_by(id_usuario = 1).all()
    favoritos_serialized = [favorito.serialize() for favorito in favoritos] 
    return jsonify (favoritos_serialized)  

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
def add_comentario():
    data = request.get_json()

    new_comentario = Comentario(
        album_id = data['album_id'],
        user_id = data['user_id'],
        texto = data['comentario']
        )
    db.session.add(new_comentario)
    db.session.commit()
    return jsonify("Comentario añadido")

@api.route('/comentariosAlbum/<albumid>', methods=['GET'])
def get_comentarios(albumid):
    comentarios = Comentario.query.filter_by(album_id=albumid).all()
    
    if not comentarios:
        return jsonify({"message": "No hay comentarios para este álbum"}), 404

    return jsonify([comentario.serialize() for comentario in comentarios]), 200
