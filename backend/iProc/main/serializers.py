from rest_framework import serializers
from django.contrib.auth.models import User


class userListSerializer(serializers.ModelSerializer):
    extra_kwargs = {'password': {'write_only': True}} 
    class Meta:
        model = User
        fields = ['id', 'last_login', 'is_superuser', 'username', 'first_name','last_name','email','is_staff','is_active','date_joined','groups','user_permissions']
      