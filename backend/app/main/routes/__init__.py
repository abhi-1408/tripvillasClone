from flask import Blueprint


user = Blueprint('user', __name__)
admin = Blueprint('admin', __name__)
entity = Blueprint('entity', __name__)

from . import User 
from . import Admin 
from . import Entity  
