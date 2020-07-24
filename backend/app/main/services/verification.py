from ..models import db
from ..models.AllUserModel import AllUser
# from ..models.UserOAuth import UserOAuth
from ..models.Verification import Verification
from flask import jsonify
import json
import jwt
import time


def user_reset_query(email):
    
    try:
        
        result = AllUser.query.filter(AllUser.email == email).first()

        if result == None:
            return {'error': False, 'message': 'email not registered'}
            #already registered in my db from oauth
        else:
            expires = time.time()+600
            key = 'masai'
            token = jwt.encode({"expires":expires,"key":"verification_masai","email":email},key)

            verfn = Verification(email = email, token = token, usage = 'reset', expires = expires)
            db.session.add(verfn)
            db.session.commit()

            # return {'error': False, 'message': 'added in verification table'}
            # temp = token
            # print('temp is *******/////////\\\\\\\\\,',temp)
            return {'error': False, 'message': {'token':token.decode('utf-8'),'email':email}}
            # return {'error': False, 'message': {'token':temp,'email':email}}
    except Exception as err:
        return {'error': True, 'error_found': format(err)}


def user_reset_response(email,new_password,token):
    
    try:
        
        result = AllUser.query.filter(AllUser.email == email).first()

        if result == None:
            return {'error': False, 'message': 'email not registered'}
            #already registered in my db from oauth
        else:
            expires = time.time()
            key = 'masai'
            decoded_token = jwt.decode(token,key)
            if decoded_token['expires'] >=expires and decoded_token['email']==email:
                result = AllUser.query.filter(AllUser.email == email).first()
                result.password = new_password
                db.session.commit()
                return {'error': False, 'message': 'password updated'}

            else:
                return {'error': False, 'message': 'link expired'}
            # token = jwt.encode({"expires":expires,"key":"verification_masai"},key)

            verfn = Verification(email = email, token = token, usage = 'reset', expires = expires)
            db.session.add(verfn)
            db.session.commit()

            return {'token':token,'email':email}
    except Exception as err:
        return {'error': True, 'error_found': format(err)}

