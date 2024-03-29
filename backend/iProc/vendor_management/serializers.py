from rest_framework import serializers
from .models import VendorRequest, VendorTags, Categories, Trades, DiversityClassification, VendorBasicInfo, \
CertificatesAndLisences,ComplianceTask,  VendorAddress, VendorFileUpload, Notes, VendorHistory, ReviewTemplate, ReviewResponse, \
ReviewResponseStatus, ComplianceVendorTask, ComplianceVendorResponse, ComplianceTaskCriteria, VendorComplianceStatus, \
VendorComplianceHistory

class VendorRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = VendorRequest
        fields = '__all__'


class ComplianceTaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = ComplianceTask
        fields = '__all__'


class VendorTagsSerializer(serializers.ModelSerializer):

    class Meta:
        model = VendorTags
        fields = '__all__'

class CategoriesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Categories
        fields = '__all__'

class TradesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Trades
        fields = '__all__'

class TradesSerializerWithDepth(serializers.ModelSerializer):

    class Meta:
        model = Trades
        fields = '__all__'
        depth = 1

class DiversityClassificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = DiversityClassification
        fields = '__all__'

class VendorBasicSerializer(serializers.ModelSerializer):

    class Meta:
        model = VendorBasicInfo
        fields = ['id', 'vendor_name', 'contact_name', 'contact_email', 'contact_phone', 'designation', 'department', 'created_by','approval_status',]

class PendingVendorBasicSerializer(serializers.ModelSerializer):

    class Meta:
        model = VendorBasicInfo
        fields = '__all__'

class VendorBasicSerializerWithDepth(serializers.ModelSerializer):

    class Meta:
        model = VendorBasicInfo
        fields = '__all__'
        depth=1

class CertAndLisencesSerializer(serializers.ModelSerializer):

    class Meta:
        model = CertificatesAndLisences
        fields = '__all__'

class VendorAddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = VendorAddress
        fields = '__all__'

class VendorFileUploadSerializer(serializers.ModelSerializer):

    class Meta:
        model = VendorFileUpload
        fields = '__all__'

class VendorFileUploadWithDepthSerializer(serializers.ModelSerializer):

    class Meta:
        model = VendorFileUpload
        fields = '__all__'
        depth=1

class NotesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Notes
        fields = '__all__'

class VendorHistorySerializer(serializers.ModelSerializer):

    class Meta:
        model = VendorHistory
        fields = '__all__'

class ReviewTemplateSerializer(serializers.ModelSerializer):

    class Meta:
        model = ReviewTemplate
        fields = '__all__'

class ReviewResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = ReviewResponse
        fields = '__all__'

class ReviewResponseStatusSerializer(serializers.ModelSerializer):

    class Meta:
        model = ReviewResponseStatus
        fields = '__all__'
    

class ReviewResponseWithDepthSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ReviewResponseStatus
        fields = '__all__'
        depth=1
    



class ComplianceVendorTaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = ComplianceVendorTask
        fields = '__all__'

class ComplianceVendorTaskSerializerWithDepth(serializers.ModelSerializer):

    class Meta:
        model = ComplianceVendorTask
        fields = '__all__'
        depth=1

class ComplianceVendorResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = ComplianceVendorResponse
        fields = '__all__'

class ComplianceTaskCriteriaSerializer(serializers.ModelSerializer):

    class Meta:
        model = ComplianceTaskCriteria
        fields = '__all__'

class VendorComplianceStatusSerializer(serializers.ModelSerializer):

    class Meta:
        model = VendorComplianceStatus
        fields = '__all__'

class VendorComplianceHistorySerializer(serializers.ModelSerializer):

    class Meta:
        model = VendorComplianceHistory
        fields = '__all__'

