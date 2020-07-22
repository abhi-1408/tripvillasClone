from ..models import db
from ..models.AllUserModel import AllUser
import json


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
        us = AllUser(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            password=data['password'],
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

    if email == "" or password == "":
        return (
            {'error': True, 'error_found': 'one or more field is empty'}
        )
    elif type(email) != str or type(password) != str:
        return (
            {'error': True, 'error_found': 'Insert valid data type'}
        )

    try:
        results = AllUser.query.filter(AllUser.email==email,AllUser.password==password).first()
        flag = 0
        # for result in results:
        #     if result['email'] == email:
        #         if result['password'] == password:
        if results:
            flag=1
            

        if(flag==1):
            return ({'error':False,'message':'login successful'})
        else:
            return ({'error':False,'message':'login failed'})
    # except:
    #     return {"error": True}
    except Exception as err:
        return ({'error': True, 'error_found': format(err)})


def logout_user():
    return {}