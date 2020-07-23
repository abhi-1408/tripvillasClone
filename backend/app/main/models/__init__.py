from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

from . import AllUserModel
from . import UserOAuth
from . import Verification




