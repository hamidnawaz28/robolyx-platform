from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Role,  UserProject,  UserData, DefaultTemplate, SavedTemplate, \
RuleEngine, RuleEngineHistory, InvoiceData, TaxonomyData, ContractData, GLOrgData, POData 

class userListSerializer(serializers.ModelSerializer):
    extra_kwargs = {'password': {'write_only': True}} 
    class Meta:
        model = User
        fields = ['id', 'last_login', 'is_superuser', 'username', 'first_name','last_name','email','is_staff','is_active','date_joined','groups','user_permissions']

class RoleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Role
        fields = '__all__'

class UserProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProject
        fields = '__all__'

class UserDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserData
        fields = '__all__'

class DefaultTemplateSerializer(serializers.ModelSerializer):

    class Meta:
        model = DefaultTemplate
        fields = '__all__'

class SavedTemplateSerializer(serializers.ModelSerializer):

    class Meta:
        model = SavedTemplate
        fields = '__all__'

class RuleEngineSerializer(serializers.ModelSerializer):

    class Meta:
        model = RuleEngine
        fields = '__all__'

class RuleEngineHistorySerializer(serializers.ModelSerializer):

    class Meta:
        model = RuleEngineHistory
        fields = '__all__'

class InvoiceDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = InvoiceData
        fields = '__all__'

class TaxonomyDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = TaxonomyData
        fields = '__all__'

class ContractDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = ContractData
        fields = '__all__'

class GLOrgDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = GLOrgData
        fields = '__all__'

class PODataSerializer(serializers.ModelSerializer):

    class Meta:
        model = POData
        fields = '__all__'

class ImpactRuleEngineSerializer(serializers.ModelSerializer):
    invoice_impacted = serializers.SerializerMethodField('get_impacted_invoices_count')

    def get_impacted_invoices_count(self, obj):
        ruleobj = RuleEngine.objects.get(pk=obj.pk)
        return InvoiceData.objects.filter(RuleEngineReference=ruleobj).count()

    class Meta:
        model = RuleEngine
        fields = ('pk', 'invoice_impacted')