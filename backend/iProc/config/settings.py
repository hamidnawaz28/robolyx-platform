"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 3.1.1.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""

from pathlib import Path
import os
import pdb
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'nv+5xrvb=%$dpk+we#ja4a%mvb_90-cr0m1iz=5l1o1zz05@f1'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'main',
    'core.apps.CoreConfig',
    'config',
    'tickets',
    'import_export',
    'basic_config',
    'vendor_management',
]

# REST_FRAMEWORK = {
#     'DEFAULT_PERMISSION_CLASSES': [
#         'rest_framework.permissions.AllowAny',
#     ]
# }
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.AllowAny',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
}
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    # 'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
# CORS_ORIGIN_WHITELIST = [
#     'https://localhost:3000'
# ]
# ...

JWT_AUTH = {
    'JWT_RESPONSE_PAYLOAD_HANDLER': 'core.utils.my_jwt_response_handler'
}
ALLOWED_HOSTS = ['+','localhost' ,'127.0.0.1','3.26.44.105','192.168.0.100','ec2-54-253-85-203.ap-southeast-2.compute.amazonaws.com','54.253.85.203', "ec2-3-26-44-105.ap-southeast-2.compute.amazonaws.com",'ec2-3-26-44-105.ap-southeast-2.compute.amazonaws.com:8600', 'http://localhost:8090','robolyx.com', '127.0.0.1']
CORS_ORIGIN_ALLOW_ALL = True

CORS_ORIGIN_WHITELIST = (
       'http://localhost:8090',
       'http://localhost:3000',
       'http://localhost:3001',
)
CORS_ALLOW_METHODS = (
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
)

CORS_ALLOW_HEADERS = (
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
)
ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'build')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = "smtp.mail.yahoo.com"
EMAIL_PORT = 587
EMAIL_HOST_USER = "hamid.nawaz28@yahoo.com"
EMAIL_HOST_PASSWORD = "mmzynfpzxcaiedft"
EMAIL_USE_TLS = True


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases
DATABASES = {
    'default': {
        "ENGINE": 'django.db.backends.postgresql_psycopg2',
        "NAME": 'iproc10',
        "USER": 'postgres',
        "PASSWORD": 'admin',
        "HOST": '127.0.0.1',
        "PORT": '5432'
    }
}

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }
FILE_UPLOAD_PERMISSIONS = 0o644

# DATABASES = {
#     'default': {
#         "ENGINE": 'django.db.backends.postgresql_psycopg2',
#         "NAME": 'postgres',
#         "USER": 'postgres',
#         "PASSWORD": 'adminadmin',
#         "HOST": 'db-postgresql.cndoiqbntk4p.ap-southeast-2.rds.amazonaws.com',
#         "PORT": '5432'
#     }
# }


# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = '/static/'
#STATIC_ROOT = os.path.join(BASE_DIR, 'static')

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# pdb.set_trace()
# STATICFILES_DIRS = [
#     os.path.join(BASE_DIR, 'static_cdn'),
#     os.path.join(BASE_DIR, 'build', 'static'),
# ]
DATA_UPLOAD_MAX_NUMBER_FIELDS = 10000