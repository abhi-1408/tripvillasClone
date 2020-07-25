from . import db
from .HotelModel import Hotel


class RoomMeta(db.Model):
    __table__name = 'roommeta'
    id = db.Column(db.Integer, primary_key = True)
    hotel_id = db.Column(db.Integer,db.ForeignKey(Hotel.id))
    units = db.Column(db.Integer,default = 1)
    max_guests = db.Column(db.Integer)
    total_price = db.Column(db.Float)
    ac = db.Column(db.Boolean,default = False)
    cook_on_call = db.Column(db.Boolean,default = False)
    parking = db.Column(db.Boolean,default = False)
    spa = db.Column(db.Boolean,default = False)
    image_mid_small = db.Column(db.JSON)
    image_mid_large = db.Column(db.JSON)
    image_mid_medium = db.Column(db.JSON)
    image_medium = db.Column(db.JSON)
    image_large = db.Column(db.JSON)
    image_small = db.Column(db.JSON)
    number_of_bathrooms = db.Column(db.Integer)
    functional_kitchen = db.Column(db.Boolean,default = False)
    lat = db.Column(db.String(200))
    lng = db.Column(db.String(200))
    internet = db.Column(db.Boolean,default = False)
    pets = db.Column(db.Boolean,default = False)
    dish_washer = db.Column(db.Boolean,default = False)
    instant_bookable = db.Column(db.Boolean,default = False)
    premium = db.Column(db.Boolean,default = False)
    gym = db.Column(db.Boolean,default = False)
    refrigerator = db.Column(db.Boolean,default = False)
    television = db.Column(db.Boolean,default = False)
    housekeeping = db.Column(db.Boolean,default = False)
    swimming_pool = db.Column(db.Boolean,default = False)
    washing_machine = db.Column(db.Boolean,default = False)
    cancellation_policy_name = db.Column(db.String(200))
    cancellation_policy_desc = db.Column(db.String(200))
    # added
    nights = db.Column(db.Integer)
    offer = db.Column(db.Integer)
    min_occupancy = db.Column(db.Integer)
    occupancy = db.Column(db.Integer)
    min_room = db.Column(db.Integer)
    prop_tags = db.Column(db.JSON)
    url = db.Column(db.String(200))
    location_name = db.Column(db.String(200))
    discounted_price = db.Column(db.Float)


    
    
    