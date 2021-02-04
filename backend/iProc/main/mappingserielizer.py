from rest_framework import serializers
from .models import AllTempletes

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'templeteName',
            'templeteItems',
        )
        model = AllTempletes