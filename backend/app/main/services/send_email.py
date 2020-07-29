import smtplib
import os

aws_ese_usernanme = os.environ['AWS_ESE_USERNAME']
aws_ese_password = os.environ['AWS_ESE_PASSWORD']

def send_email(to,message):
    s = smtplib.SMTP()

    s.connect('email-smtp.ap-south-1.amazonaws.com',587)
    s.starttls()
    s.login(aws_ese_usernanme,aws_ese_password)

    msg = 'From: abhionnet20@gmail.com\nTo: saklani1408@gmail.com\nSubject: Booking with TRIPVILLAS\n\n'+ message
    s.sendmail('abhionnet20@gmail.com','saklani1408@gmail.com',msg)

