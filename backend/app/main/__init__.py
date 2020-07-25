# this will do ur create app
from flask import Flask 
from config import app_config
from flask_migrate import Migrate
from .models import *
from .routes import user as user_blueprint
from .routes import admin as admin_blueprint
from .routes import entity as entity_blueprint
from flask_sqlalchemy import SQLAlchemy
from flask import Blueprint
from flask_cors import CORS


def create_app(config_name):
    app=Flask(__name__, instance_relative_config = True)
    CORS(app)
    app.config.from_object(app_config[config_name])
    app.config.from_pyfile('config.py')
    app.register_blueprint(user_blueprint, url_prefix = '/user')
    app.register_blueprint(admin_blueprint, url_prefix = '/admin')
    app.register_blueprint(entity_blueprint, url_prefix = '/entity')
    db.init_app(app)
    migrate=Migrate(app,db)

    return app