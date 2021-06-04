import os
from celery import Celery
 
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
 
app = Celery('config', broker='redis://localhost:6379')

app.config_from_object('django.conf:settings')
  
app.autodiscover_tasks()  