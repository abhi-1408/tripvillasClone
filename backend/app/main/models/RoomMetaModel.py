from . import db
from .HotelModel import Hotel


class RoomMeta(db.Model):
    __table__name = 'roommeta'
    id = db.Column(db.Integer, primary_key = True)
    hotel_id = db.Column(db.Integer,db.ForeignKey(Hotel.id))
    total_units = db.Column(db.Integer,default = 1)
    max_guests = db.Column(db.Integer)
    price = db.Column(db.Integer)
    airconditioner = db.Column(db.Boolean,default = False)
    cook_on_call = db.Column(db.Boolean,default = False)
    parking = db.Column(db.Boolean,default = False)
    spa = db.Column(db.Boolean,default = False)
    image_mid_small = db.Column(db.JSON)
    image_mid_large = db.Column(db.JSON)
    image_mid_medium = db.Column(db.JSON)
    number_of_bathrooms = db.Column(db.Integer)
    functional_kitchen = db.Column(db.Boolean,default = False)
    latitude = db.Column(db.String(200))
    longitude = db.Column(db.String(200))
    internet = db.Column(db.Boolean,default = False)
    pets = db.Column(db.Boolean,default = False)
    dishwasher = db.Column(db.Boolean,default = False)
    instant_bookable = db.Column(db.Boolean,default = False)
    premium = db.Column(db.Boolean,default = False)
    gym = db.Column(db.Boolean,default = False)
    refrigarator = db.Column(db.Boolean,default = False)
    television = db.Column(db.Boolean,default = False)
    housekeeping = db.Column(db.Boolean,default = False)
    swimming_pool = db.Column(db.Boolean,default = False)
    washing_machine = db.Column(db.Boolean,default = False)
    cancellation_policy_name = db.Column(db.String(200))
    cancellation_policy_desc = db.Column(db.String(200))

    
    
    