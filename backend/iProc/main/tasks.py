import logging
from django.contrib.auth import get_user_model
from config.celery import app
 
@app.task
def add_data():
    UserModel = get_user_model()
    try:
        i =0 
        print("==========2==========")
        for i in range(100000000000000000000000):
            j=0
        print("==========4==========")
        
    except UserModel.DoesNotExist:
        logging.warning("Tried to send verification email to non-existing user")