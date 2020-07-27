import time
import jwt
import json
from ..models.HotelModel import Hotel
from ..models.RoomMetaModel import RoomMeta
from ..models.BookedSlotModel import BookedSlot
from ..models import db
from sqlalchemy.orm import sessionmaker





def filter_data(data):
    # try:
    # Session = sessionmaker()
    # Session.configure(bind=engine)
    # session = Session()
    # result = db.session.query(Hotel,RoomMeta).join(RoomMeta,Hotel.id==RoomMeta.hotel_id)
    all_unav = []
    if 'check_in' and 'check_out' in data:
        res11 = Hotel.query.all()
        all_hotel_id = []
        for i in  res11:
            all_hotel_id.append(i.id)

        stmt = "select DATE(booked_for_date) as bd,hotel_id,count(*),number_of_rooms,number_of_rooms - count(*) as available from booked_slot join hotel on booked_slot.hotel_id=hotel.id  where booked_for_date between (:checkin) and (:checkout) group by hotel_id,booked_for_date"
        arg = ({"checkin":data['check_in'],"checkout":data['check_out']})
        result = db.session.execute(stmt,arg)


        unavailable = set()
        for item in result:
            if item.available == 0:
                unavailable.add(item.hotel_id)
            print('item***********',item.bd,item.hotel_id,item.available)

        print('unavailable***************',unavailable)

        all_unav = list(unavailable)

        # hotels=Hotel.query.filter(~Hotel.id.in_(all_unav)).all()

    
    
    
    # if len(all_unav)>0:
    #     result = db.session.query(Hotel,RoomMeta).join(RoomMeta)
    # else:
    result = db.session.query(Hotel,RoomMeta).join(RoomMeta)

    # print((result))
    sort_by = None
    # result =db.session.execute('''select * from hotel JOIN room_meta ON hotel.id=room_meta.hotel_id''')
    for key in data:
        print('key is //////\\\\\\\88888',key,data[key])
        if data[key]=='true':
            data[key] = 1
        elif data[key]=='false':
            data[key] = 0
        if key == 'hotel_id':
            result = result.filter(RoomMeta.hotel_id == data[key])
        elif key == 'total_units':
            result = result.filter(RoomMeta.total_units == data[key])
        elif key == 'max_guests':
            result = result.filter(RoomMeta.max_guests == data[key])
        elif key == 'price':
            result = result.filter(RoomMeta.price == data[key])
        elif key == 'ac':
            result = result.filter(RoomMeta.ac == data[key])
        elif key == 'cook_on_call':
            result = result.filter(RoomMeta.cook_on_call == data[key])
        elif key == 'parking':
            result = result.filter(RoomMeta.parking == data[key])
        elif key == 'spa':
            result = result.filter(RoomMeta.spa == data[key])
        elif key == 'number_of_bathrooms':
            result = result.filter(RoomMeta.number_of_bathrooms == data[key])
        elif key == 'functional_kitchen':
            result = result.filter(RoomMeta.functional_kitchen == data[key])
        elif key == 'internet':
            result = result.filter(RoomMeta.internet == data[key])
        elif key == 'pets':
            result = result.filter(RoomMeta.pets == data[key])
        elif key == 'dishwasher':
            result = result.filter(RoomMeta.dishwasher == data[key])
        elif key == 'instant_bookable':
            result = result.filter(RoomMeta.instant_bookable == data[key])
        elif key == 'premium':
            result = result.filter(RoomMeta.premium == data[key])
        elif key == 'gym':
            result = result.filter(RoomMeta.gym == data[key])
        elif key == 'refrigerator':
            result = result.filter(RoomMeta.refrigerator == data[key])
        elif key == 'television':
            result = result.filter(RoomMeta.television == data[key])
        elif key == 'housekeeping':
            result = result.filter(RoomMeta.housekeeping == data[key])
        elif key == 'swimming_pool':
            result = result.filter(RoomMeta.swimming_pool == data[key])
        elif key == 'washing_machine':
            result = result.filter(RoomMeta.washing_machine == data[key])
        elif key == 'sort_by':
            #either asc or desc
            sort_by = data[key]

        # print('temp is',result)
    
    if sort_by:
        if sort_by == 'asc':
            result = result.order_by(RoomMeta.total_price)
        elif sort_by == 'desc':
            result = result.order_by(RoomMeta.total_price.desc())
        elif sort_by == 'relevence':
            result = result.order_by(Hotel.ratings.desc())
        

    res = result.all()
    print('res *************',res)
    temp = []
    for hotel,room in res:
        
        # print(a,b)
        # temp_dict['id'] = a.id
        # temp_dict['title'] = a.title
        # temp_dict['location'] = a.location
        # temp_dict['total_price'] = b.total_price
        # temp.append(temp_dict)
        if hotel.id not in all_unav:
            temp_dict={}
            temp_dict['id'] = hotel.id
            temp_dict['title'] = hotel.title
            temp_dict['category_id'] = 1
            # temp_dict['created_on'] = hotel.created_on
            temp_dict['review_count'] = hotel.review_count,
            temp_dict['review_count'] = temp_dict['review_count'][0]
            temp_dict['property_type'] = hotel.property_type,
            temp_dict['property_type'] = temp_dict['property_type'][0]
            temp_dict['country'] = hotel.country,
            temp_dict['country'] = temp_dict['country'][0]
            temp_dict['active'] = hotel.active,
            temp_dict['active'] = temp_dict['active'][0]
            # print('active is',active[0],type(active))
            temp_dict['review_rating'] = hotel.review_rating,
            temp_dict['review_rating'] =temp_dict['review_rating'][0]
            temp_dict['city'] = hotel.city,
            temp_dict['city'] = temp_dict['city'][0]
            temp_dict['state'] = hotel.state,
            temp_dict['state'] = temp_dict['state'][0]
            temp_dict['number_of_rooms'] = hotel.number_of_rooms,
            temp_dict['number_of_rooms'] =temp_dict['number_of_rooms'][0]
            temp_dict['min_night'] = hotel.min_night,
            temp_dict['min_night'] =temp_dict['min_night'][0]
            temp_dict['min_lead_time'] = hotel.min_lead_time
            

            temp_dict['units'] = room.units
            temp_dict['total_price'] = room.total_price
            temp_dict['ac'] = room.ac
            temp_dict['cook_on_call'] = room.cook_on_call
            temp_dict['parking'] = room.parking
            temp_dict['spa'] = room.spa
            temp_dict['image_mid_large'] = room.image_mid_large
            temp_dict['image_small'] = room.image_small
            temp_dict['image_medium'] = room.image_medium
            temp_dict['image_large'] = room.image_large
            temp_dict['number_of_bathrooms'] = room.number_of_bathrooms
            temp_dict['functional_kitchen'] = room.functional_kitchen
            temp_dict['lat'] = room.lat
            temp_dict['lng'] = room.lng
            temp_dict['internet'] = room.internet
            temp_dict['pets'] = room.pets
            temp_dict['dish_washer'] = room.dish_washer
            temp_dict['instant_bookable'] = room.instant_bookable
            temp_dict['premium'] = room.premium
            temp_dict['gym'] = room.gym
            temp_dict['refrigerator'] = room.refrigerator
            temp_dict['television'] = room.television
            temp_dict['housekeeping'] = room.housekeeping
            temp_dict['swimming_pool'] = room.swimming_pool
            temp_dict['washing_machine'] = room.washing_machine
            # cancellation_policy_name= room.cancellation_policy_name']
            # cancellation_policy_desc = room.cancellation_policy_desc']
            temp_dict['cancellation_policy_name']= "Stringent"
            temp_dict['cancellation_policy_desc'] = "No charges will be levied if booking is canceled 61 days prior to check-in."
            temp_dict['occupancy'] = room.occupancy
            temp_dict['prop_tags'] = room.prop_tags
            temp_dict['url'] = room.url
            temp_dict['location_name'] = room.location_name
            if 'state' in data:
                if data['state'] in temp_dict['state']:
                    temp.append(temp_dict)
            # else:
            #     temp.append(temp_dict)

    return {"error": False, "message":'filtered data',"data":temp}
    # except:
    #     return {"error": True, "message":'filtering falied'}

    