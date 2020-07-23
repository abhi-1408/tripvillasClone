from . import user
from flask import request,redirect,jsonify
from ..services.alluser import register_user,login_user
from ..services.useroauth import user_o_auth_check
from ..services.verification import user_reset_query,user_reset_response
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

@user.route('/oauth_signin',methods=['POST'])
def oauth_signup():
    data = request.get_json()
    res = user_o_auth_check(data)

    return json.dumps(res)


@user.route('/reset_password/',methods=['GET'])
def reset_request():
    email = request.args['email']
    res = user_reset_query(email)
    
    # return json.dumps(res)
    return json.dumps('/user/reset/'+res['message']['token']+'/'+email)
    # return redirect('/user/reset/'+res.decode("utf-8")+'/'+email)
    # return json.dumps( {'error': False, 'message': {'token':res.decode('utf-8'),'email':email}})
   

@user.route('/reset/<token>/<email>',methods=['GET','POST'])
def reset_resp(token,email):
    data = request.get_json()
    res = user_reset_response(email,data['new_password'],token)

    return json.dumps(res)
    # return res
