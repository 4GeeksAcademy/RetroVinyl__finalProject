from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash


db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    encoded_password = db.Column(db.String(500), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    name = db.Column(db.String(120), nullable=True)
    sur_name = db.Column(db.String(120), nullable=True)
    username = db.Column(db.String(120), unique=True, nullable=True)
    mobile_number = db.Column(db.String(120), unique=True, nullable=True)
    post_code = db.Column(db.String(120), nullable=True)
    state = db.Column(db.String(120), nullable=True)
    country = db.Column(db.String(120),  nullable=True)
    region_state = db.Column(db.String(120), nullable=True)
    favoritos = db.relationship ("Favorito", backref ="user", lazy = True)
    comentarios = db.relationship ("Comentario", backref ="user", lazy = True)
    
   
    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email, 
            "favorito" : [favorito.serialize() for favorito in self.favoritos]
        }
    def set_password(self, password):
        self.encoded_password = generate_password_hash(str(password))
    
    def check_password(self, password):
        return check_password_hash(self.encoded_password, password)

    
class Album(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250), unique=False, nullable=False)
    country = db.Column(db.String(80), unique=False, nullable=False)
    year = db.Column(db.String(80), unique=False, nullable=False)
    cover_image = db.Column(db.String(250), unique=False, nullable=False)
    genre = db.Column(db.String(250), unique=False, nullable=False)
    have = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return f'<Album {self.title}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "country" : self.country,
            "year" : self.year,
            "cover_image" : self.cover_image,
            "genre" : self.genre,
            "have" : self.have,   
        }

class Pedido(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    album_title_order = db.Column(db.String(250), unique=False, nullable=False)
    album_country_order = db.Column(db.String(80), unique=False, nullable=False)
    album_year_order = db.Column(db.String(80), unique=False, nullable=False)
    album_cover_image_order = db.Column(db.String(250), unique=False, nullable=False)
    album_genre_order = db.Column(db.String(250), unique=False, nullable=False)
    album_date_order = db.Column(db.String(250), unique=False, nullable=False)
    album_order_id = db.Column(db.Integer, unique=False, nullable=False)

    def __repr__(self):
        return f'<Pedido {self.album_title_order}>'

    def serialize(self):
        return {
            "id": self.id,
            "album_title_order": self.album_title_order,
            "album_country_order" : self.album_country_order,
            "album_year_order" : self.album_year_order,
            "album_cover_image_order" : self.album_cover_image_order,
            "album_genre_order" : self.album_genre_order,
            "album_date_order" : self.album_date_order,
            "album_order_id" : self.album_order_id
        }
    
class Favorito(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_album = db.Column(db.Integer, db.ForeignKey('album.id'))
    id_usuario = db.Column(db.Integer, db.ForeignKey('user.id'))
    album = db.relationship('Album', backref = 'favoritos', lazy =True)
    def __repr__(self):
        return f'<Favorito {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "id_album" : self.id_album, 
            "id_usuario" : self.id_usuario,
            "album" : self.album.serialize()
        } 

class Comentario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    texto = db.Column(db.String(250), unique=False, nullable=False)
    album_id = db.Column(db.Integer, db.ForeignKey('album.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    album = db.relationship('Album', backref = 'comentario', lazy =True)
    def __repr__(self):
        return f'<Comentario {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "texto": self.texto,
            "id_album" : self.album_id, 
            "id_usuario" : self.user_id
        }     
