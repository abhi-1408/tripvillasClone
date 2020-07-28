from . import db



class PaymentGateway(db.Model):
    __table__name = 'paymentgateway'
    id = db.Column(db.Integer, primary_key = True)
    order_id = db.Column(db.String(200),unique = True)
    total_price = db.Column(db.Float)
    payment_details = db.Column(db.JSON)
    # booked_for_date = db.Column(db.DateTime)
    
    
    