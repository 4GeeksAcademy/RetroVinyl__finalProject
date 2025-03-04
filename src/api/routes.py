"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Album
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.fetch_data import get_all_albums # importar las funciones que llaman a la API externa
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/get-albums', methods=['GET']) # Crear un end-point de tipo get
def llamada_api(): #Funcion que ejecuta las demas funciones importadas mas arriba
    get_all_albums()
        
    return jsonify("Albumes creados"), 200 #mensaje si la llamada es exitosa

@api.route('/get-albums-db', methods=['GET']) # Crear un end-point de tipo get
def get_albums(): #Funcion que ejecuta las demas funciones importadas mas arriba
    albumes = Album.query.all() 
    albumes_serialized = [album.serialize() for album in albumes]
    return albumes_serialized