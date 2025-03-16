from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timezone


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
            "favorito" : [favorito.serialize() for favorito in self.favoritos],
            "name" : self.name,
            "sur_name" : self.sur_name,
            "username" : self.username,
            "mobile_number": self.mobile_number,
            "post_code" : self.post_code,
            "state" : self.state,
            "country": self.country,
            "region_state" : self.region_state
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
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    album_id = db.Column(db.Integer, db.ForeignKey('album.id'), nullable=False)
    precio_total = db.Column(db.Float, nullable=False)
    fecha = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    cantidad = db.Column(db.Integer, nullable=False)
    shipping_name = db.Column(db.String(120), nullable=True)
    shipping_address = db.Column(db.String(250), nullable=True)
    shipping_city = db.Column(db.String(120), nullable=True)
    shipping_cp = db.Column(db.String(20), nullable=True)
    shipping_country = db.Column(db.String(120), nullable=True)
    shipping_contactNumber = db.Column(db.String(50), nullable=True)

    user = db.relationship("User", backref="pedidos")
    album = db.relationship("Album", backref="pedidos")

    def __repr__(self):
        return f'<Pedido {self.album.title}>'

    def serialize(self): #al relacionar la tabla Pedido con la de User y Album, puedes serializar variables de estas dos tablas y asi tener sus valores.
        return {
            "id": self.id,
            "user_id": self.user_id,
            "precio_total": self.precio_total,
            "cantidad": self.cantidad,
            "fecha": self.fecha.strftime('%d-%m-%Y') if self.fecha else None,
            "album_id": self.album_id,
            "album_title": self.album.title,
            "album_country": self.album.country,
            "album_year": self.album.year,
            "album_genre": self.album.genre,
            "album_cover_image": self.album.cover_image,
            "shipping_name": self.shipping_name,
            "shipping_address": self.shipping_address,
            "shipping_city": self.shipping_city,
            "shipping_cp": self.shipping_cp,
            "shipping_country": self.shipping_country,
            "shipping_contactNumber": self.shipping_contactNumber
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
    album = db.relationship('Album', backref = 'comentarios', lazy =True)
    def __repr__(self):
        return f'<Comentario {self.id}>'

    def serialize(self):
        user_name = self.user.username if self.user and self.user.username else self.user.email if self.user else "Usuario desconocido"

        return {
            "id": self.id,
            "texto": self.texto,
            "album_id" : self.album_id, 
            "user_id" : self.user_id,
            "username": user_name,
        }     
