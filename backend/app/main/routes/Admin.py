from . import admin
from flask import request,redirect,jsonify
import json
from ..services.hotel import create_hotel,get_hotel,create_booking,available,specific_hotel_available
from ..services.roommeta import create_room
from ..services.filterdata import filter_data

@admin.route('/')
def a_home():
    return 'admin home'

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

