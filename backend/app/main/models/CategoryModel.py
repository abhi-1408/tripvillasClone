from . import db


class Category(db.Model):
    __table__name = 'category'
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(200))
    description = db.Column(db.String(200))
    