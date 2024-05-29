import requests
from .settings import EMAIL_SERVER_TOKEN,MAIN_EMAIL
import logging
from .email_template import email_template


server_token = EMAIL_SERVER_TOKEN
template_id = ""

url = "https://api.postmarkapp.com/email"
headers = {"X-Postmark-Server-Token": server_token, "Content-Type": "application/json", "Accept":"application/json"}


def send_email(recipient_email, data,subject, html_body):
    
    body = {
        "From": MAIN_EMAIL,
        "To": recipient_email,
        "Subject": subject,
        "TemplateModel":data,
        "HtmlBody": html_body,
        "InlineCss": True,
    }
     
    response = requests.post(url, headers=headers, json=body).json()
    

    if response["Message"] == "OK" and response["ErrorCode"]==0:
        message = "Email sent successfully!"
        logging.info(msg=message)
    
    else:
        message = f'Error sending email: Message: {response["Message"]}, Error code: {response["ErrorCode"]}'
        
        logging.error(msg=message)

def receive_email(recipient_email,first_name,last_name,email,phone,message):
    subject = "Contact Form Submission"
    
    data = {
        "first_name": first_name,
        "last_name":last_name,
        "email": email,
        "phone": phone,
        "message":message 
    }

    html_body = email_template(first_name,last_name,email,phone,message)

    send_email(recipient_email, data, subject,html_body)