  
import os
from flask_admin import Admin
from .models import db, Album
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(Album, db.session)) # interfaz grafica de las clases que aparece al ejecutar pipenv run start

    

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))