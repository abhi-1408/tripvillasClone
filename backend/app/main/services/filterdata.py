import time
import jwt
import json
from ..models.HotelModel import Hotel
from ..models.RoomMetaModel import RoomMeta
from ..models import db


def filter_data(data):
    try:
        result = Hotel.query.join(RoomMeta,Hotel.id==RoomMeta.hotel_id)
        
        # result =db.session.execute('''select * from hotel JOIN room_meta ON hotel.id=room_meta.hotel_id''')
        for key in data:
            print('key is //////\\\\\\\88888',key,data[key])
            if key == 'internet':
                result = result.filter(RoomMeta.internet == data[key])
            elif key == 'gym':
                print(type(RoomMeta.gym))
                result = result.filter(RoomMeta.gym == data[key])
            print('temp is',result)

        res = result.all()
        print('res *************',res)

        return {"error": False, "message":'room created'}
    except:
        return {"error": True, "message":'room creation failed'}

    