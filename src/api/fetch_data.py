import requests;
from api.models import db, Album
from flask import Flask, jsonify

# Declarar la función que descarga la información de la API externa
def get_all_albums():
    # Creamos una variable que es un arreglo de varias URLS
    urls = [
        'https://api.discogs.com/database/search?token=WQAxjDCJeWfuEBnunoMXwUEJBMqaeLpphFJamvGm&genre=rock&year=1960-1969&format=vinyl%20-%20LP&have=desc',
        'https://api.discogs.com/database/search?token=WQAxjDCJeWfuEBnunoMXwUEJBMqaeLpphFJamvGm&genre=rock&year=1960-1969&format=vinyl%20-%20LP',
        'https://api.discogs.com/database/search?token=WQAxjDCJeWfuEBnunoMXwUEJBMqaeLpphFJamvGm&genre=pop&year=1960-1969&format=vinyl%20-%20LP&have=desc',
        'https://api.discogs.com/database/search?token=WQAxjDCJeWfuEBnunoMXwUEJBMqaeLpphFJamvGm&genre=pop&year=1960-1969&format=vinyl%20-%20LP',
        'https://api.discogs.com/database/search?token=WQAxjDCJeWfuEBnunoMXwUEJBMqaeLpphFJamvGm&genre=jazz&year=1960-1969&format=vinyl%20-%20LP&have=desc',
        'https://api.discogs.com/database/search?token=WQAxjDCJeWfuEBnunoMXwUEJBMqaeLpphFJamvGm&genre=jazz&year=1960-1969&format=vinyl%20-%20LP',
        'https://api.discogs.com/database/search?token=WQAxjDCJeWfuEBnunoMXwUEJBMqaeLpphFJamvGm&genre=funk&year=1960-1969&format=vinyl%20-%20LP&have=desc',
        'https://api.discogs.com/database/search?token=WQAxjDCJeWfuEBnunoMXwUEJBMqaeLpphFJamvGm&genre=funk&year=1960-1969&format=vinyl%20-%20LP',

        'https://api.discogs.com/database/search?token=WQAxjDCJeWfuEBnunoMXwUEJBMqaeLpphFJamvGm&genre=rock&year=1970-1979&format=vinyl%20-%20LP&have=desc',
        'https://api.discogs.com/database/search?token=WQAxjDCJeWfuEBnunoMXwUEJBMqaeLpphFJamvGm&genre=rock&year=1970-1979&format=vinyl%20-%20LP',
        'https://api.discogs.com/database/search?token=WQAxjDCJeWfuEBnunoMXwUEJBMqaeLpphFJamvGm&genre=pop&year=1970-1979&format=vinyl%20-%20LP&have=desc',
        'https://api.discogs.com/database/search?token=WQAxjDCJeWfuEBnunoMXwUEJBMqaeLpphFJamvGm&genre=pop&year=1970-1979&format=vinyl%20-%20LP',
        'https://api.discogs.com/database/search?token=WQAxjDCJeWfuEBnunoMXwUEJBMqaeLpphFJamvGm&genre=jazz&year=1970-1979&format=vinyl%20-%20LP&have=desc',
        'https://api.discogs.com/database/search?token=WQAxjDCJeWfuEBnunoMXwUEJBMqaeLpphFJamvGm&genre=jazz&year=1970-1979&format=vinyl%20-%20LP',
        'https://api.discogs.com/database/search?token=WQAxjDCJeWfuEBnunoMXwUEJBMqaeLpphFJamvGm&genre=funk&year=1970-1979&format=vinyl%20-%20LP&have=desc',
        'https://api.discogs.com/database/search?token=WQAxjDCJeWfuEBnunoMXwUEJBMqaeLpphFJamvGm&genre=funk&year=1970-1979&format=vinyl%20-%20LP',

        'https://api.discogs.com/database/search?token=WQAxjDCJeWfuEBnunoMXwUEJBMqaeLpphFJamvGm&genre=rock&year=1980-1989&format=vinyl%20-%20LP&have=desc',
        'https://api.discogs.com/database/search?token=WQAxjDCJeWfuEBnunoMXwUEJBMqaeLpphFJamvGm&genre=rock&year=1980-1989&format=vinyl%20-%20LP',
        'https://api.discogs.com/database/search?token=WQAxjDCJeWfuEBnunoMXwUEJBMqaeLpphFJamvGm&genre=pop&year=1980-1989&format=vinyl%20-%20LP&have=desc',
        'https://api.discogs.com/database/search?token=WQAxjDCJeWfuEBnunoMXwUEJBMqaeLpphFJamvGm&genre=pop&year=1980-1989&format=vinyl%20-%20LP',
        'https://api.discogs.com/database/search?token=WQAxjDCJeWfuEBnunoMXwUEJBMqaeLpphFJamvGm&genre=jazz&year=1980-1989&format=vinyl%20-%20LP&have=desc',
        'https://api.discogs.com/database/search?token=WQAxjDCJeWfuEBnunoMXwUEJBMqaeLpphFJamvGm&genre=jazz&year=1980-1989&format=vinyl%20-%20LP',
        'https://api.discogs.com/database/search?token=WQAxjDCJeWfuEBnunoMXwUEJBMqaeLpphFJamvGm&genre=funk&year=1980-1989&format=vinyl%20-%20LP&have=desc',
        'https://api.discogs.com/database/search?token=WQAxjDCJeWfuEBnunoMXwUEJBMqaeLpphFJamvGm&genre=funk&year=1980-1989&format=vinyl%20-%20LP',

        'https://api.discogs.com/database/search?token=WQAxjDCJeWfuEBnunoMXwUEJBMqaeLpphFJamvGm&genre=rock&year=1990-1999&format=vinyl%20-%20LP&have=desc',
        'https://api.discogs.com/database/search?token=WQAxjDCJeWfuEBnunoMXwUEJBMqaeLpphFJamvGm&genre=rock&year=1990-1999&format=vinyl%20-%20LP',
        'https://api.discogs.com/database/search?token=WQAxjDCJeWfuEBnunoMXwUEJBMqaeLpphFJamvGm&genre=pop&year=1990-1999&format=vinyl%20-%20LP&have=desc',
        'https://api.discogs.com/database/search?token=WQAxjDCJeWfuEBnunoMXwUEJBMqaeLpphFJamvGm&genre=pop&year=1990-1999&format=vinyl%20-%20LP',
        'https://api.discogs.com/database/search?token=WQAxjDCJeWfuEBnunoMXwUEJBMqaeLpphFJamvGm&genre=jazz&year=1990-1999&format=vinyl%20-%20LP&have=desc',
        'https://api.discogs.com/database/search?token=WQAxjDCJeWfuEBnunoMXwUEJBMqaeLpphFJamvGm&genre=jazz&year=1990-1999&format=vinyl%20-%20LP',
        'https://api.discogs.com/database/search?token=WQAxjDCJeWfuEBnunoMXwUEJBMqaeLpphFJamvGm&genre=funk&year=1990-1999&format=vinyl%20-%20LP&have=desc',
        'https://api.discogs.com/database/search?token=WQAxjDCJeWfuEBnunoMXwUEJBMqaeLpphFJamvGm&genre=funk&year=1990-1999&format=vinyl%20-%20LP',
    ]
    # Aquí se almacenará la información dek primer for 
    all_albums = []
    # Aqui recorremos cada url y luego guardamos la información de cada uno en all_albums
    for url in urls:
        response = requests.get(url).json()
        all_albums.extend(response['results'])
    # El mismo for que teniamos antes pero sustituyendo el response por all_albums 
    for album in all_albums:
        exist = Album.query.filter_by(title= album.get("title")).first() # Verificar si el album ya existe en la base de datos propia, first() devuelve la primera coincidencia con respecto al id
        if not exist: 
            newAlbum = Album(
                title = album["title"],
                genre = ", ".join(album["genre"]),  # Convertir lista a string, ", ".join = unelos con una coma y una espacio
                year = album["year"],
                country = album["country"],
                cover_image = album["cover_image"],
                have = album["community"]["have"],
            )
            db.session.add(newAlbum) #Agregar registro en la base de datos 
            db.session.commit() #Guardar registro en la base de datos
    return jsonify("album creado")
    

