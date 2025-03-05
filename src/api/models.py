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
    
    
    
