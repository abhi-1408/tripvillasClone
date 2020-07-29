import os
from twilio.rest import Client



account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_ACCOUNT_TOKEN']

def send_msg(phone_number,msg):
    client = Client(account_sid, auth_token)
    message  = client.messages.create(
        to = "+918218331426",
        from_ = "+19282284594",
        body = msg
    )

    print('message id is',message.sid)