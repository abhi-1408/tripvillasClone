import time
import jwt
import json
from ..models.PaymentGatewayModel import PaymentGateway
from ..models import db
import requests
import datetime
from datetime import datetime as dt


def add_to_payment_gateway(data):
    ps = PaymentGateway(order_id = data['payload']['payment']['entity']['order_id'],total_price = data['payload']['payment']['entity']['amount'], payment_details = data)
    db.session.add(ps)
    db.session.commit()


    return {'error':False,"message":"added in razorpay payment db"}
