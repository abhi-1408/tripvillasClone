from . import entity
from flask import request,redirect,jsonify
import json
from ..services.ratingnreview import add_review
from ..services.entity import get_specific_property_id,get_all_orders,get_all_review_of_a_property,get_recommended_property

@entity.route('/')
def e_home():
    return 'entity home'



@entity.route('/getprop',methods=['POST'])
def e_get_prop():
    data = request.get_json()
    res = get_specific_property_id(data)

    return json.dumps(res)


@entity.route('/getorder',methods=['POST'])
def e_get_order():
    data = request.get_json()
    res = get_all_orders(data)

    return json.dumps(res)


@entity.route('/getreview',methods=['POST'])
def e_get_review():
    data = request.get_json()
    res = get_all_review_of_a_property(data)

    return json.dumps(res)


@entity.route('/getrecommend',methods=['POST'])
def e_recomm():
    data = request.get_json()
    res = get_recommended_property(data)

    return json.dumps(res)

@entity.route('/addreview',methods=['POST'])
def r_add_rev():
    data = request.get_json()
    res = add_review(data)

    return json.dumps(res)
