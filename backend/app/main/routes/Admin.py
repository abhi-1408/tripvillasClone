from . import admin
from flask import request,redirect,jsonify
import json
from ..services.hotel import create_hotel,get_hotel
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