from . import db
from .AllUserModel import AllUser

class UserOAuth(db.Model):
    __table__name = 'useroauth'
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer,db.ForeignKey(AllUser.id))
    provider = db.Column(db.String(200))
    provider_id = db.Column(db.String(200),unique=True)
    access_token = db.Column(db.TEXT)
    refresh_token = db.Column(db.TEXT)
    data = db.Column(db.JSON())

    