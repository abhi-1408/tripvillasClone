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




def add_review(data):


    review = RatingNReview(hotel_id = data['hotel_id'], user_id = data['user_id'], review = data['review'], rating = data['rating'], created_at = data['created_at'])
    db.session.add(review)
    db.session.commit()

    count = 0
    reviews = RatingNReview.query.filter(RatingNReview.hotel_id == data['hotel_id']).all()

    total = 0
    for rev in reviews:
        total += int(rev.rating)
        count += 1


    avg_rating =  total/count
    answer = str(round(avg_rating, 2))

    hotel = Hotel.query.filter(Hotel.id == data['hotel_id']).first()
    hotel.review_rating = answer
    hotel.review_count = count
    db.session.commit() 


    return 'added review & updated count'

