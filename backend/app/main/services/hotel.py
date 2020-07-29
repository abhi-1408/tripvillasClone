import time
import jwt
import json
from ..models.HotelModel import Hotel
from ..models.RoomMetaModel import RoomMeta
from ..models.BookingModel import Booking
from ..models.BookedSlotModel import BookedSlot
from ..models.PaymentGatewayModel import PaymentGateway
from ..models import db
import requests
import datetime
from datetime import datetime as dt
from .send_sms import send_msg
from .send_email import send_email



    

def load_hotel():
    # link = "https://www.tripvillas.com/api/webapp/search/?q=Delhi,%20India&lat=28.68627380000001&lng=77.2217831&check_in=26-Jul-2020&check_out=28-Jul-2020"
    # link ="https://www.tripvillas.com/api/webapp/search/?q=Delhi%20India&lat=28.68627380000001&lng=77.2217831&check_in=29-Jul-2020&check_out=31-Jul-2020"
    # link = "https://www.tripvillas.com/api/webapp/search/?q=Goa,INDIA&check_in=29-Jul-2020&check_out=31-Jul-2020"
    # link = "https://www.tripvillas.com/api/webapp/search/?q=Galle,Southern%20Province,SRI%20LANKA&check_in=29-Jul-2020&check_out=31-Jul-2020"
    # link = "https://www.tripvillas.com/api/webapp/search/?q=Phuket,THAILAND&check_in=29-Jul-2020&check_out=31-Jul-2020"
    # link = "https://www.tripvillas.com/api/webapp/search/?q=Kandy,Central%20Province,SRI%20LANKA&check_in=29-Jul-2020&check_out=31-Jul-2020"
    # link = "https://www.tripvillas.com/api/webapp/search/?q=Lonavala,Maharashtra,INDIA&check_in=29-Jul-2020&check_out=31-Jul-2020"
    # link = "https://www.tripvillas.com/api/webapp/search/?q=Kerala,INDIA&check_in=29-Jul-2020&check_out=31-Jul-2020"
    # link = "https://www.tripvillas.com/api/webapp/search/?q=Himachal%20Pradesh,INDIA&check_in=29-Jul-2020&check_out=31-Jul-2020"
    link = "https://www.tripvillas.com/api/webapp/search/?q=Bali,INDONESIA&check_in=29-Jul-2020&check_out=31-Jul-2020"
    # link = "https://www.tripvillas.com/api/webapp/search/?q=Cape%20Town,Western%20Cape,SOUTH%20AFRICA&check_in=29-Jul-2020&check_out=31-Jul-2020"
    r = requests.get(url = link)
    data = r.json()

    data = data['properties']

    # video_url = "https://youtube.com/watch?v="+cur

    return data

def create_hotel():
    # try:
        # title = (data[title],"")
        # organization =(data[title],"")
    data = load_hotel()
    print('*****data is',len(data))
    # i =107
    # temp = []
    # temp.append(data[0])
    for item in data:
        title = item['title']
        category_id = 1
        created_on = item['created_on']
        review_count = item['review_count'],
        property_type = item['property_type'],
        country = item['country'],
        active = item['active'],
        # print('active is',active[0],type(active))
        review_rating = item['review_rating'],
        city = item['city'],
        state = item['state'],
        number_of_rooms = item['number_of_rooms'],
        min_night = item['min_night'],
        min_lead_time = item['min_lead_time']

        hotel = Hotel(title = title, category_id = category_id,active =active[0],created_on = created_on, review_count = review_count, property_type = property_type[0], country = country[0], review_rating = review_rating[0], city = city[0], state = state[0], number_of_rooms = number_of_rooms[0], min_night = min_night[0], min_lead_time = min_lead_time)
        db.session.add(hotel)
        db.session.commit()

        # ROOMMETA
        for_id = Hotel.query.filter(Hotel.title.like(title)).first()
        hotel_id = for_id.id
        units = item['units']
        total_price = item['total_price']
        total_price = total_price.replace('$','')
        total_price = float(total_price)
        ac = item['ac']
        cook_on_call = item['cook_on_call']
        parking = item['parking']
        spa = item['spa']
        image_mid_large = item['images_mid_large']
        image_small = item['images_small']
        image_medium = item['images_medium']
        image_large = item['images_large']
        number_of_bathrooms = item['number_of_bathrooms']
        functional_kitchen = item['functional_kitchen']
        lat = item['lat']
        lng = item['lng']
        internet = item['internet']
        pets = item['pets']
        dish_washer = item['dish_washer']
        instant_bookable = item['instant_bookable']
        premium = item['premium']
        gym = item['gym']
        refrigerator = item['refrigerator']
        television = item['television']
        housekeeping = item['housekeeping']
        swimming_pool = item['swimming_pool']
        washing_machine = item['washing_machine']
        # cancellation_policy_name= item['cancellation_policy_name']
        # cancellation_policy_desc = item['cancellation_policy_desc']
        cancellation_policy_name= "Stringent"
        cancellation_policy_desc = "No charges will be levied if booking is canceled 61 days prior to check-in."
        occupancy = item['occupancy']
        prop_tags = item['prop_tags']
        url = item['url']
        location_name = item['location_name']
        # print(type(ac),type(cook_on_call),type(parking),type(spa))
        room = RoomMeta(hotel_id= hotel_id,units = units,total_price = total_price, ac = ac, cook_on_call = cook_on_call, parking = parking, spa = spa, image_mid_large = image_mid_large, image_small = image_small, image_medium = image_medium, image_large = image_large,number_of_bathrooms = number_of_bathrooms,functional_kitchen = functional_kitchen,lat = lat,lng = lng,internet = internet,pets = pets,dish_washer = dish_washer, instant_bookable = instant_bookable,premium = premium, gym = gym, refrigerator = refrigerator,television = television,housekeeping = housekeeping,swimming_pool = swimming_pool,washing_machine = washing_machine,cancellation_policy_name= cancellation_policy_name,cancellation_policy_desc = cancellation_policy_desc,occupancy = occupancy,prop_tags = prop_tags,url = url,location_name = location_name)
        db.session.add(room)
        db.session.commit()
        
        # i += 1

    
    return 'data loading'
    #     return {"error": False, "message":'hotel created'}
    # except:
    #     return {"error": True, "message":'hotel creation failed'}


def get_hotel():

    hotels = Hotel.query.all()
    data = []
    for hotel in hotels:
        temp_dict = {}
        hotel_id = hotel.id
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
        data.append(temp_dict)

    
    return data


def create_booking(data):

    razor = PaymentGateway.query.filter(PaymentGateway.order_id == data['order_id']).first()

    if razor:
        payment_details = razor.payment_details
        book = Booking(hotel_id = data['property']['id'],booking_id = data['order_id'],check_in = data['check_in'], check_out = data['check_out'],booking_date = data['booking_date'],total_price = payment_details['payload']['payment']['entity']['amount'], payment_detail = payment_details['payload']['payment'],status = payment_details['event'],customer_name = data['customer_details']['customer_name'], customer_mobile = data['customer_details']['customer_mobile'], customer_email = data['customer_details']['customer_email'], user_id = int(data['user_id']))
        db.session.add(book)
        db.session.commit()

        # start_date = data['check_in']
        # end_date = data['check_out']
        start_date = dt.strptime(data['check_in'], '%Y-%m-%d')
        end_date = dt.strptime(data['check_out'], '%Y-%m-%d')
        delta = datetime.timedelta(days=1)

        while start_date <= end_date:
            print('DATES IS ****************',start_date)
            bookslot = BookedSlot(hotel_id = data['property']['id'],booked_for_date = str(start_date))
            db.session.add(bookslot)
            db.session.commit()
            start_date += delta

        send_msg("+91"+data['customer_details']['customer_mobile'],"hey "+str(data['customer_details']['customer_name'])+", booking is confirmed,"+" Paid Rs "+str((payment_details['payload']['payment']['entity']['amount'])/100)+", order id is:"+str(data['order_id'])+", booked hotel id: "+str(data['property']['id'])+ ", check in date: "+str(data['check_in'])+" check out date: "+ str(data['check_out'])+' Thanks for booking with TRIPVILLAS')
        send_email(data['customer_details']['customer_email'],"hey "+str(data['customer_details']['customer_name'])+", booking is confirmed,"+" Paid Rs "+str((payment_details['payload']['payment']['entity']['amount'])/100)+", order id is:"+str(data['order_id'])+", booked hotel id: "+str(data['property']['id'])+ ", check in date: "+str(data['check_in'])+" check out date: "+ str(data['check_out'])+' Thanks for booking with TRIPVILLAS')
        return {"error":False,"message":"booking done","status":True,"order_number":data['order_id']}
    return {"error":True,"message":'booking cant be added, not legit'}

def available(data):
    
    res = Hotel.query.all()
    all_hotel_id = []
    for i in  res:
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

    hotels=Hotel.query.filter(~Hotel.id.in_(all_unav)).all()

    # for hotel in res2:
    #     room = RoomMeta.query.filter(RoomMeta.hotel_id==hotel.id).first()

    alldata=[]
    for hotel in hotels:
        temp_dict = {}
        hotel_id = hotel.id
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
        alldata.append(temp_dict)   

    

    # print('all available',all_avai)
    
    return alldata



    # got all hotel ids


# def test(data):
    
#     if 'check_in' in data:
#         return 'present'

    
#     return 'not present'


def specific_hotel_available(data):
    
    
    stmt = "select DATE(booked_for_date) as bd,hotel_id,count(*),number_of_rooms,number_of_rooms - count(*) as available from booked_slot join hotel on booked_slot.hotel_id=hotel.id  where booked_for_date between (:checkin) and (:checkout) and hotel_id = (:hotel_id) group by hotel_id,booked_for_date"
    arg = ({"checkin":data['check_in'],"checkout":data['check_out'],"hotel_id":data['hotel_id']})
    result = db.session.execute(stmt,arg)


    for item in result:
        if item.available <= 0:
            return {"flag":False,"message":"not available on selected dates"}
    
    return {"flag":True,"message":"available on selected dates"}
    
        

    