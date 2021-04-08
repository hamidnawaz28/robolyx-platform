from rest_framework import serializers
from .models import Ticket, List, Ticket_upload, IndexHistory, ContentHistory


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'

class TicketSerializerWithDepth(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'
        depth=1    



class ListSerializer(serializers.ModelSerializer):
    revlisttickets = TicketSerializerWithDepth(read_only=True, many=True)

    class Meta:
        model = List
        fields = '__all__'
        depth = 1

class TicketUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket_upload
        fields = '__all__'

class TicketUploadSerializerWithDepth(serializers.ModelSerializer):
    class Meta:
        model = Ticket_upload
        fields = '__all__'
        depth = 1

class IndexHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = IndexHistory
        fields = '__all__'

class ContentHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentHistory
        fields = '__all__'
        depth = 1