from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    name = db.Column(db.String(120), nullable=False)
    sur_name = db.Column(db.String(120), nullable=False)
    username = db.Column(db.String(120), unique=True, nullable=False)
    mobile_number = db.Column(db.String(120), unique=True, nullable=False)
    post_code = db.Column(db.String(120), nullable=False)
    state = db.Column(db.String(120), nullable=False)
    country = db.Column(db.String(120),  nullable=False)
    region_state = db.Column(db.String(120), nullable=False)
    
   
    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email, 
        }
    
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
    title = db.Column(db.String(250), unique=False, nullable=False)
    country = db.Column(db.String(80), unique=False, nullable=False)
    year = db.Column(db.String(80), unique=False, nullable=False)
    cover_image = db.Column(db.String(250), unique=False, nullable=False)
    genre = db.Column(db.String(250), unique=False, nullable=False)
    have = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return f'<Favorito {self.title}>'

    def serialize(self):
        return {
            "id": self.id,
            "id_album" : self.id_album,
            "title": self.title,
            "country" : self.country,
            "year" : self.year,
            "cover_image" : self.cover_image,
            "genre" : self.genre,
            "have" : self.have,   
        }    
