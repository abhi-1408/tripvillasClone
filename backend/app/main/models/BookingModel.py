from . import db
from .HotelModel import Hotel


class Booking(db.Model):
    __table__name = 'booking'
    id = db.Column(db.Integer, primary_key = True)
    hotel_id = db.Column(db.Integer,db.ForeignKey(Hotel.id))
    customer_name = db.Column(db.String(200))
    customer_mobile = db.Column(db.String(10))
    total_price = db.Column(db.Float)
    payment_details = db.Column(db.String(200))
    number_of_units = db.Column(db.Integer)
    booking_date = db.Column(db.DateTime)
    check_in = db.Column(db.DateTime)
    check_out = db.Column(db.DateTime)
    number_of_guests = db.Column(db.Integer)
    status = db.Column(db.String(100))
    # booked_for_date = db.Column(db.DateTime)
    
    
    