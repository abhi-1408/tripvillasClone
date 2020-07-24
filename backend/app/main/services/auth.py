import time
import jwt
import json


def auth_check(data):
    # auth_token=data['auth_token']
    key='masai'

    decoded_jwt=jwt.decode(data,key)

    if decoded_jwt['expire']>=time.time():
        return {'token_status':True}
    else:
        return {'token_status':False}