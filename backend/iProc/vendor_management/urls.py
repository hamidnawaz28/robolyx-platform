from django.urls import path, include 
from rest_framework import routers
from .views import VendorRequestViewSet

router = routers.DefaultRouter()
router.register("vendor-req", VendorRequestViewSet, basename='vendor-req')

urlpatterns = [
    path('', include(router.urls)),
]