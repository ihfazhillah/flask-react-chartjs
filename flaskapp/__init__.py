from flask import Flask
from flask_cors import CORS

from .config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
CORS(app)
migrate = Migrate(app, db)

from .src import models, routes

