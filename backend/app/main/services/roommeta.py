import time
import jwt
import json
from ..models.RoomMetaModel import RoomMeta
from ..models import db


def create_room(data):
    try:
        room = RoomMeta(hotel_id = data['hotel_id'], price = data['price'], airconditioner = data['airconditioner'], internet = data['internet'], gym = data['gym'])
        db.session.add(room)
        db.session.commit()

        return {"error": False, "message":'room created'}
    except:
        return {"error": True, "message":'room creation failed'}

    