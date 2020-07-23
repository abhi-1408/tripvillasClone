from . import db
from .CategoryModel import Category


class Hotel(db.Model):
    __table__name = 'hotel'
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(200))
    organization = db.Column(db.String(200))
    description = db.Column(db.String(200))
    deleted = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)
    category_id = db.Column(db.Integer,db.ForeignKey(Category.id))
    total_units = db.Column(db.Integer)
    max_guests = db.Column(db.Integer)
    reviews_count = db.Column(db.Integer)
    ratings = db.Column(db.Float)
    property_type = db.Column(db.String(50))
    location = db.Column(db.String(200))
    country = db.Column(db.String(200))
    active = db.Column(db.Boolean)
    
    
    