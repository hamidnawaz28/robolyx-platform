from rest_framework import serializers
from .models import Ticket, Ticket_upload, ContentHistory


class TicketSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ticket
        fields = '__all__'

class TicketSerializerWithDepth(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'
        depth=1    


class TicketUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket_upload
        fields = '__all__'

class TicketUploadSerializerWithDepth(serializers.ModelSerializer):
    class Meta:
        model = Ticket_upload
        fields = '__all__'
        depth = 1

class ContentHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentHistory
        fields = '__all__'
        depth = 1