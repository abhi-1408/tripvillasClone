import time
import jwt
import json
from ..models.BookingModel import Booking
from ..models import db
from sqlalchemy.orm import sessionmaker
from sqlalchemy import desc



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

