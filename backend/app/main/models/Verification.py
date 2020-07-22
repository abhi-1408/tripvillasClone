from . import db


class Verification(db.Model):
    __table__name = 'verification'
    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String(200),unique=True)
    token = db.Column(db.String(200),unique=True)
    usage = db.Column(db.String(10),unique=True)
    expires = db.Column(db.String(200))
  