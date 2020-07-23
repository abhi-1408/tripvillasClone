from . import db
from .HotelModel import Hotel
from .AllUserModel import AllUser


class RatingNReview(db.Model):
    __table__name = 'ratingnreview'
    id = db.Column(db.Integer, primary_key = True)
    hotel_id = db.Column(db.Integer,db.ForeignKey(Hotel.id))
    user_id = db.Column(db.Integer,db.ForeignKey(AllUser.id))
    review = db.Column(db.String(200))
    rating = db.Column(db.Integer)
    created_at = db.Column(db.DateTime)
    
    
    
    