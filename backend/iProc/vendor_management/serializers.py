from rest_framework import serializers
from .models import VendorRequest

class VendorRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = VendorRequest
        fields = '__all__'
