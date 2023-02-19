import os

from .settings import *

SECRET_KEY = os.getenv("DJANGO_SECRET_KEY")

DEBUG = False

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'notes',
        'USER': 'michael',
        'PASSWORD': 'michael0000',
        'HOST': 'db',
        'PORT': '5432',
    }
}
