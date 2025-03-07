from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    
   
    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email, 
        }
    
class Perfil(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    sur_name = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(120), unique=True, nullable=False)
    mobile_number = db.Column(db.String(120), unique=True, nullable=False)
    post_code = db.Column(db.String(120), unique=True, nullable=False)
    state = db.Column(db.String(120), unique=True, nullable=False)
    country = db.Column(db.String(120), unique=True, nullable=False)
    region_state = db.Column(db.String(120), unique=True, nullable=False)
   
    def __repr__(self):
        return f'<Perfil {self.username}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "sur name": self.sur_name,
            "username": self.username,
            "mobile" : self.mobile_number,
            "post code" : self.post_code,
            "state" : self.state,
            "country": self.country,
            "region state": self.region_state,
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
    
    
    
