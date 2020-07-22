from . import db


class AllUser(db.Model):
    __table__name = 'alluser'
    id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String(200))
    last_name = db.Column(db.String(200))
    email = db.Column(db.String(200),unique=True)
    password = db.Column(db.String(200))
    mobile = db.Column(db.String(10),unique=True)
  