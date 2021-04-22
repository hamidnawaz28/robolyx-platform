from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
from main.models import UserData
import pdb
import base64

#
# class UserDataSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserData
#         fields = ['User', 'Name', 'Email', 'Organization', 'RoleValidity', 'RoleReference', 'UserProjectReference']
#
#
# class UserSerializer(serializers.ModelSerializer):
#     user_data = UserDataSerializer(read_only=True)
#
#     class Meta:
#         model = User
#         fields = ('id', 'username', 'user_data')


class UserSerializer(serializers.ModelSerializer):

    user_data = serializers.SerializerMethodField('get_user_data')

    def get_user_data(self, obj):
        user_data = UserData.objects.get(User=obj.id)
        my_string = ''
        if user_data.Image.name:
            with open(user_data.Image.path, "rb") as img_file:
                my_string = base64.b64encode(img_file.read())
        return {
            "userDataRef": user_data.pk,
            "email": user_data.Email,
            "name": user_data.Name,
            "organization": user_data.Organization,
            "roleValidity": user_data.RoleValidity,
            "image": my_string,
            "roleReference": user_data.RoleReference.pk,
            "rolePermissions": user_data.RoleReference.Permissions,
            "userProjectReference": user_data.UserProjectReference.pk,
            "userProjectName": user_data.UserProjectReference.Name,
            "userProjectValidity": user_data.UserProjectReference.ValidityDate
        }

    class Meta:
        model = User
        fields = ('id', 'username', 'user_data')


class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password')
