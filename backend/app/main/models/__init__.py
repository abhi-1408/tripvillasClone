from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

from . import AllUserModel
from . import UserOAuth
from . import Verification
from . import CategoryModel
from . import HotelModel
from . import RoomMetaModel
from . import BookingModel
from . import BookedSlotModel
from . import RatingNReviewModel




