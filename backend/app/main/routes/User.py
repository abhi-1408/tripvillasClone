from . import user
from flask import request
from ..services.alluser import register_user,login_user
import json


@user.route('/')
def s_home():
    return 'user home'


@user.route('/signin',methods=['POST'])
def signin():
    credentials = request.get_json()
    res = login_user(credentials)

    return json.dumps(res)

@user.route('/signup',methods=['POST'])
def signup():
    data = request.get_json()
    res = register_user(data)

    return json.dumps(res)