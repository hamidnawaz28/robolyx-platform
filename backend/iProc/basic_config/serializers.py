from rest_framework import serializers
from .models import BusinessUnit, Department, Regions, Divisions, Sites, Tags, PaymentTerm

class BusinessUnitSerializer(serializers.ModelSerializer):

    class Meta:
        model = BusinessUnit
        fields = '__all__'


class DepartmentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Department
        fields = '__all__'


class RegionsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Regions
        fields = '__all__'


class DivisionsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Divisions
        fields = '__all__'

class SitesSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Sites
        fields = '__all__'

class TagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tags
        fields = '__all__'

class PaymentTermSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentTerm
        fields = '__all__'

