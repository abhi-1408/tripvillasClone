from ..models import db
from ..models.AllUserModel import AllUser
from ..models.UserOAuth import UserOAuth
# from ..models.Verification import *
import json
import jwt


def user_o_auth_check(data):
    try:
        first_name = data['profileObj']['name'],
        last_name = data['profileObj']['familyName'],
        email = data['profileObj']['email']
        password = None
        mobile = ""

        
        provider = data['tokenObj']['idpId']
        provider_id = data['googleId']
        access_token = data['accessToken']
        refresh_token = data['tokenObj']['id_token']
        data = {}
    
    
    except KeyError as err:
        return ({'error': True, 'error_found': format(err)})
    except TypeError as err:
        return ({'error': True, 'error_found': format(err)})
    except Exception as err:
        return ({'error': True, 'error_found': format(err)})

    
    try:
        
        result = AllUser.query.filter(AllUser.email == email).first()

        if result != None:
            return {'error': False, 'message': 'login successfully'}
            #already registered in my db from oauth
        else:
            user = AllUser(first_name = first_name, last_name = last_name, email = email, password = password, mobile = mobile)
            db.session.add(user)
            db.session.commit()

            res = AllUser.query.filter(AllUser.email == email).first()
            
            if res != None:
                user_id = res.id
                oauth_user = UserOAuth(user_id = user_id, provider = provider, provider_id = provider_id, access_token = access_token, refresh_token = refresh_token, data = data)
                db.session.add(oauth_user)
                db.session.commit()
            

        return (
            {'error': False, 'message': 'login & registered successfully'}
        )
    except Exception as err:
        return {'error': True, 'error_found': format(err)}

