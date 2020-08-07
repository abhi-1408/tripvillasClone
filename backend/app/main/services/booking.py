import time
import jwt
import json
from ..models.BookingModel import Booking
from ..models import db
from sqlalchemy.orm import sessionmaker
from sqlalchemy import desc
from ..models.HotelModel import Hotel
from ..models.RoomMetaModel import RoomMeta
from ..models.BookingModel import Booking
from ..models.BookedSlotModel import BookedSlot
from ..models.PaymentGatewayModel import PaymentGateway
import requests
import datetime
from datetime import datetime as dt
from .send_sms import send_msg
from .send_email import send_email


def all_booking(data):

    bookings = Booking.query.filter(Booking.user_id == data['id']).order_by(desc(Booking.id)).all()

    allbook = []
    for booking in bookings:
        temp_dict = {}
        temp_dict['hotel_id'] = booking.hotel_id
        temp_dict['user_id'] = booking.user_id
        temp_dict['booking_id'] = booking.booking_id
        temp_dict['customer_name'] = booking.customer_name
        temp_dict['customer_mobile'] = booking.customer_mobile
        temp_dict['customer_email'] = booking.customer_email
        temp_dict['total_price'] = booking.total_price
        temp_dict['payment_detail'] = booking.payment_detail
        temp_dict['number_of_units'] = booking.number_of_units
        temp_dict['booking_date'] = str(booking.booking_date)
        temp_dict['check_in'] = str(booking.check_in)
        temp_dict['check_out'] = str(booking.check_out)
        temp_dict['number_of_guests'] = booking.number_of_guests
        temp_dict['status'] = booking.status
        allbook.append(temp_dict)



    return allbook



def create_booking(data):
    # from hotel.py
    razor = PaymentGateway.query.filter(PaymentGateway.order_id == data['order_id']).first()

    if razor:
        payment_details = razor.payment_details
        book = Booking(hotel_id = data['property']['id'],number_of_units= data["units"],booking_id = data['order_id'],check_in = data['check_in'], check_out = data['check_out'],booking_date = data['booking_date'],total_price = payment_details['payload']['payment']['entity']['amount'], payment_detail = payment_details['payload']['payment'],status = payment_details['event'],customer_name = data['customer_details']['customer_name'], customer_mobile = data['customer_details']['customer_mobile'], customer_email = data['customer_details']['customer_email'], user_id = int(data['user_id']))
        db.session.add(book)
        db.session.commit()

        # start_date = data['check_in']
        # end_date = data['check_out']
        start_date = dt.strptime(data['check_in'], '%Y-%m-%d')
        end_date = dt.strptime(data['check_out'], '%Y-%m-%d')
        delta = datetime.timedelta(days=1)

        while start_date <= end_date:
            print('DATES IS ****************',start_date)
            for i in range(int(data['units'])):
                bookslot = BookedSlot(hotel_id = data['property']['id'],booked_for_date = str(start_date))
                db.session.add(bookslot)
                db.session.commit()
            start_date += delta

        send_msg("+91"+data['customer_details']['customer_mobile'],"hey "+str(data['customer_details']['customer_name'])+", booking is confirmed,"+" Paid Rs "+str((payment_details['payload']['payment']['entity']['amount'])/100)+", order id is:"+str(data['order_id'])+", booked hotel id: "+str(data['property']['id'])+ ", check in date: "+str(data['check_in'])+" check out date: "+ str(data['check_out'])+' Thanks for booking with TRIPVILLAS')
        send_email(data['customer_details']['customer_email'],"hey "+str(data['customer_details']['customer_name'])+", booking is confirmed,"+" Paid Rs "+str((payment_details['payload']['payment']['entity']['amount'])/100)+", order id is:"+str(data['order_id'])+", booked hotel id: "+str(data['property']['id'])+ ", check in date: "+str(data['check_in'])+" check out date: "+ str(data['check_out'])+' Thanks for booking with TRIPVILLAS')
        return {"error":False,"message":"booking done","status":True,"order_number":data['order_id']}
    return {"error":True,"message":'booking cant be added, not legit'}
