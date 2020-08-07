import time
import jwt
import json
from ..models.HotelModel import Hotel
from ..models.BookingModel import Booking
from ..models.RatingNReviewModel import RatingNReview
from ..models.RoomMetaModel import RoomMeta
from ..models.BookedSlotModel import BookedSlot
from ..models import db
from sqlalchemy.orm import sessionmaker
from  sqlalchemy.sql.expression import func
from sqlalchemy import desc



def get_recommended_property(data):
    # from entity.py

    print('got data as',data)
    all_unav = []
    if 'check_in' and 'check_out' in data:
        res11 = Hotel.query.all()
        all_hotel_id = []
        for i in  res11:
            all_hotel_id.append(i.id)

        stmt = "select DATE(booked_for_date) as bd,hotel_id,count(*),number_of_rooms,number_of_rooms - count(*) as available from booked_slot join hotel on booked_slot.hotel_id=hotel.id  where booked_for_date between (:checkin) and (:checkout) group by hotel_id,booked_for_date"
        arg = ({"checkin":data['check_in'],"checkout":data['check_out']})
        result2 = db.session.execute(stmt,arg)


        unavailable = set()
        for items in result2:
            if items.available == 0:
                unavailable.add(items.hotel_id)
            # print('item***********',item.bd,item.hotel_id,item.available)

        print('unavailable***************',unavailable)

        all_unav = list(unavailable)
        all_unav.append(int(data['hotel_id']))

    # matching the number of max amenities that are same
    item = RoomMeta.query.filter(RoomMeta.hotel_id == int(data['hotel_id'])).first()

    state_data = Hotel.query.filter(Hotel.id==int(data['hotel_id'])).first()
    state = state_data.state 
    price = item.total_price
    # print("states r same22",state,data['state'])
    # return state
    results1 = Hotel.query.filter(Hotel.state.like(state)).all()

    
    for hotel in results1:
        hotel_id = hotel.id
        hotel.matching = 0
        room = RoomMeta.query.filter(RoomMeta.hotel_id==hotel_id).first()
        if item.ac == room.ac:
            hotel.matching  = hotel.matching + 1
        if item.cook_on_call == room.cook_on_call:
            hotel.matching = hotel.matching + 1
        if item.parking == room.parking:
            hotel.matching = hotel.matching + 1
        if item.spa == room.spa:
            hotel.matching = hotel.matching + 1
        if item.number_of_bathrooms == room.number_of_bathrooms:
            hotel.matching = hotel.matching + 1
        if item.functional_kitchen == room.functional_kitchen:
            hotel.matching = hotel.matching + 1
        if item.internet == room.internet:
            hotel.matching = hotel.matching + 1
        if item.pets == room.pets:
            hotel.matching = hotel.matching + 1
        if item.dish_washer == room.dish_washer:
            hotel.matching = hotel.matching + 1
        if item.instant_bookable == room.instant_bookable:
            hotel.matching = hotel.matching + 1
        if item.premium == room.premium:
            hotel.matching = hotel.matching + 1
        if item.gym == room.gym:
            hotel.matching = hotel.matching + 1
        if item.refrigerator == room.refrigerator:
            hotel.matching = hotel.matching + 1
        if item.television == room.television:
            hotel.matching = hotel.matching + 1
        if item.housekeeping == room.housekeeping:
            hotel.matching = hotel.matching + 1
        if item.swimming_pool == room.swimming_pool:
            hotel.matching = hotel.matching + 1
        if item.washing_machine == room.washing_machine:
            hotel.matching = hotel.matching + 1


        db.session.add(hotel)
        db.session.commit()
       
    
    # return 'made changes in matching'



    results = Hotel.query.filter(Hotel.state.like(state)).order_by(desc(Hotel.matching)).all()

    res = []
    added_in_res = set()
    for hotel in results:
        temp_dict = {}
        hotel_id = hotel.id
        if hotel_id not in all_unav:
            room = RoomMeta.query.filter(RoomMeta.hotel_id==hotel_id).first()
            if room.total_price <= price + 100  and room.total_price >= price - 100:
                temp_dict['id'] = hotel.id
                added_in_res.add(hotel.id)
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
                res.append(temp_dict)
    
    if len(res)<5:
        results = Hotel.query.filter(Hotel.state.like(state)).order_by(func.rand()).all()
        for hotel in results:
            temp_dict = {}
            hotel_id = hotel.id
            if hotel_id not in added_in_res and hotel_id not in all_unav:
                room = RoomMeta.query.filter(RoomMeta.hotel_id==hotel_id).first()
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
                res.append(temp_dict)

            if len(res) >=5:
                break


    print('LLenght ********',len(res))
    return res


def get_recommended_property_by_city(data):
    # from entity.py
    results = Hotel.query.filter(Hotel.state.like(data['state'])).all()

    res = []
    
    for hotel in results:
        temp_dict = {}
        hotel_id = hotel.id
        room = RoomMeta.query.filter(RoomMeta.hotel_id==hotel_id).first()
        temp_dict['id'] = hotel.id
        # added_in_res.add(hotel.id)
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
        res.append(temp_dict)

    return res


def get_recommended_property_by_rating(data):
    # from entity.py
    results = Hotel.query.filter(Hotel.state.like(data['state'])).order_by(desc(Hotel.review_rating)).all()

    res = []
    for hotel in results:
        temp_dict = {}
        hotel_id = hotel.id
        room = RoomMeta.query.filter(RoomMeta.hotel_id==hotel_id).first()
        temp_dict['id'] = hotel.id
        # added_in_res.add(hotel.id)
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
        res.append(temp_dict)

    return res
