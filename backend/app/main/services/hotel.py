import time
import jwt
import json
from ..models.HotelModel import Hotel
from ..models import db


def create_hotel(data):
    try:
        print('*****data is',data)
        hotel = Hotel(title = data['title'], description = data['description'], category_id = data['category_id'], total_units = data['total_units'], location = data['location'])
        db.session.add(hotel)
        db.session.commit()

        return {"error": False, "message":'hotel created'}
    except:
        return {"error": True, "message":'hotel creation failed'}

    