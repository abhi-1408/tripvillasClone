from ..models import db
from ..models.AllUserModel import AllUser
# from ..models.UserOAuth import *
# from ..models.Verification import *
import json
import jwt


def register_user(data):
    try:
        first_name=data['first_name'],
        last_name=data['last_name'],
        email = data['email']
        password = data['password']
        mobile = data['mobile']
        
    except KeyError as err:
        return ({'error': True, 'error_found': format(err)})
    except TypeError as err:
        return ({'error': True, 'error_found': format(err)})
    except Exception as err:
        return ({'error': True, 'error_found': format(err)})

    if data is None:
        return ({'error': True, 'error_found': 'data is empty'})
    elif first_name == '' or email == '' or password == '' or mobile == '' or last_name == '':
        return (
            {'error': True, 'error_found': 'one or more field is empty'}
        )

    try:
        print('HERE')
        key = 'masai'
        encoded_pwd = jwt.encode({"password":password},key)
        us = AllUser(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            password=encoded_pwd,
            mobile=data['mobile'],
            
        )
        db.session.add(us)
        db.session.commit()
        return (
            {'error': False, 'message': 'registered successfully'}
        )
    except Exception as err:
        return {'error': True, 'error_found': format(err)}


def login_user(credentials):
    try:
        email = credentials['email']
        password = credentials['password']
    except KeyError as err:
        return ({'error': True, 'error_found': format(err)})
    except TypeError as err:
        return ({'error': True, 'error_found': format(err)})
    except Exception as err:
        return ({'error': True, 'error_found': format(err)})

    try:
        key = 'masai'
        results = AllUser.query.filter(AllUser.email==email).first()
        flag = 0
        first_name = ""
        if results != None:
            decode_pwd = jwt.decode(results.password,key)
            if password == decode_pwd['password']:
                first_name = results.first_name
                flag=1
            

        if(flag==1):
            return ({'error':False,'message':'login successful','status':True,'username':first_name})
        else:
            return ({'error':False,'message':'credentials mismatch','status':False})
    
    except Exception as err:
        return ({'error': True, 'error_found': format(err)})


def logout_user():
    return {}