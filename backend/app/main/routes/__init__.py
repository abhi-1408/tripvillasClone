from flask import Blueprint


user = Blueprint('user', __name__)
admin = Blueprint('admin', __name__)

from . import User 
from . import Admin 
