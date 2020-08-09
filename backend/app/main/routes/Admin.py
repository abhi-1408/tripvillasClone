from . import admin
from flask import request,redirect,jsonify,render_template
import json
from ..services.hotel import create_hotel,get_hotel,available,specific_hotel_available
from ..services.roommeta import create_room
from ..services.filterdata import filter_data
from ..services.paymentgateway import add_to_payment_gateway
from ..services.booking import create_booking
import razorpay
import hmac
import hashlib
import flask
import os

razorpay_client = razorpay.Client(auth=(os.environ['RAZORPAY_CLIENT_ID'],os.environ['RAZORPAY_SECRET_KEY']))

# app = Flask(__name__,static_folder = "static", static_url_path='')

@admin.route('/')
def a_home():
    
    return 'admin home'

@admin.route('/verification',methods = ['POST'])
def r_verf():

    secret = "123456"
    rr = request.data
    print('type of rrr*****',type(rr))
    ss = bytes(secret, 'utf-8') 
    # message =request.get_json()
    mss = json.loads(rr)
    # print('IN VERN JSON FORMAT',mss)
    signature = hmac.new(
    ss,
    msg=bytes(rr),
    digestmod=hashlib.sha256
    ).hexdigest()
    # print('sign is ',signature)
    headers = flask.request.headers
    # all_data = flask.request
    # print('header******',headers['x-razorpay-signature'])
    print('NOW IN VERIFICATION RAZORPAY BACKEND')
    if headers['x-razorpay-signature'] == signature:
        res = add_to_payment_gateway(mss)
        print('LEGIT REQUEST')
    # rr1 = request.form
    # print('data*******',rr,'data in form :********',rr1)
    return json.dumps({"status":"ok"})
    # return '',200

@admin.route('/rall',methods = ['GET'])
def r_all():
    resp  = razorpay_client.order.fetch_all()
    return json.dumps(resp)

@admin.route('/rorder',methods = ['POST'])
def r_order():
    data1 = request.data
    data2 = json.loads(data1)
    cost = int(data2['total_cost']['total'])*100
    print('COST IS',cost)
    print('IN ORDER RAZOR PAY BACKEND')
    # print('RORDER DATA IS',data2)
    order_amount = int(cost)
    order_currency = 'INR'
    order_receipt = 'order_rcptid_11'
    notes = {'Shipping address': 'Bommanahalli, Bangalore'}   # OPTIONAL
    
    try :
        res = razorpay_client.order.create(dict(amount=order_amount, currency=order_currency, receipt=order_receipt, notes=notes, payment_capture='1'))
    except:
        print('error is',err)
    return json.dumps(res)
#     # secret = '123456'

#     # return 'admin home'
#     amount = 5100
#     payment_id = request.form['razorpay_payment_id']
#     razorpay_client.payment.capture(payment_id, amount)
#     return json.dumps(razorpay_client.payment.fetch(payment_id))

@admin.route('/createhotel',methods=['POST'])
def a_c_hotel():
    # data = request.get_json()
    res = create_hotel()

    return json.dumps(res)

# @admin.route('/createroom',methods=['POST'])
# def a_c_room():
#     data = request.get_json()
#     res = create_room(data)

#     return json.dumps(res)

@admin.route('/filter',methods=['GET'])
def a_filter():
    # data =request.get_json()
    data = request.args
    data1 = data.to_dict()
    r = filter_data(data1)
    # print('r is *********',r)
    return json.dumps(r)


@admin.route('/allhotel',methods=['POST'])
def a_all_hotel():
    # data = request.get_json()
    res = get_hotel()

    return json.dumps(res)

@admin.route('/create_booking',methods=['POST'])
def a_book():
    data = request.get_json()
    # print("***************data from create bookinh",data)
    # return json.dumps("good booking")
    res = create_booking(data)

    return json.dumps(res)

@admin.route('/avai',methods=['POST'])
def a_avai():
    data = request.get_json()
    res = available(data)

    return json.dumps(res)

# @admin.route('/test',methods=['POST'])
# def a_test():
#     data = request.get_json()
#     res = test(data)

#     return json.dumps(res)

@admin.route('/avaispecific',methods=['POST'])
def a_avai_spec():
    data = request.get_json()
    res = specific_hotel_available(data)

    return json.dumps(res)

