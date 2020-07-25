from . import db
from .HotelModel import Hotel


class BookedSlot(db.Model):
    __table__name = 'bookedslot'
    id = db.Column(db.Integer, primary_key = True)
    hotel_id = db.Column(db.Integer,db.ForeignKey(Hotel.id))
    customer_name = db.Column(db.String(200))
    booked_for_date = db.Column(db.DateTime)
    
    # booked_for_date = db.Column(db.DateTime)
    
    
    