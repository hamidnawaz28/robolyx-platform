from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import VendorRequest, VendorTags, Categories, Trades, DiversityClassification, VendorBasicInfo, CertificatesAndLisences, \
VendorAddress, VendorFileUpload, Notes, VendorHistory, ReviewTemplate, ReviewResponse, ReviewResponseStatus, ComplianceVendorTask, \
ComplianceVendorResponse, ComplianceTaskCriteria, VendorComplianceStatus, VendorComplianceHistory

@admin.register(VendorRequest)
class VendorRequestAdmin(ImportExportModelAdmin):
    list_display = [f.name for f in  VendorRequest._meta.fields]

@admin.register(VendorTags)
class VendorTagsAdmin(ImportExportModelAdmin):
    list_display = [f.name for f in  VendorTags._meta.fields]

@admin.register(Categories)
class CategoriesAdmin(ImportExportModelAdmin):
    list_display = [f.name for f in  Categories._meta.fields]

@admin.register(Trades)
class TradesAdmin(ImportExportModelAdmin):
    list_display = [f.name for f in  Trades._meta.fields]

@admin.register(DiversityClassification)
class DiversityClassificationAdmin(ImportExportModelAdmin):
    list_display = [f.name for f in  DiversityClassification._meta.fields]

@admin.register(VendorBasicInfo)
class VendorBasicAdmin(ImportExportModelAdmin):
    list_display = [f.name for f in  VendorBasicInfo._meta.fields]

@admin.register(CertificatesAndLisences)
class CertificatesAndLisencesAdmin(ImportExportModelAdmin):
    list_display = [f.name for f in  CertificatesAndLisences._meta.fields]

@admin.register(VendorAddress)
class VendorAddressAdmin(ImportExportModelAdmin):
    list_display = [f.name for f in  VendorAddress._meta.fields]

@admin.register(VendorFileUpload)
class VendorFileUploadAdmin(ImportExportModelAdmin):
    list_display = [f.name for f in  VendorFileUpload._meta.fields]

@admin.register(Notes)
class NotesAdmin(ImportExportModelAdmin):
    list_display = [f.name for f in  Notes._meta.fields]

@admin.register(VendorHistory)
class VendorHistoryAdmin(ImportExportModelAdmin):
    list_display = [f.name for f in  VendorHistory._meta.fields]

@admin.register(ReviewTemplate)
class ReviewTemplateAdmin(ImportExportModelAdmin):
    list_display = [f.name for f in  ReviewTemplate._meta.fields]

@admin.register(ReviewResponse)
class ReviewResponseAdmin(ImportExportModelAdmin):
    list_display = [f.name for f in  ReviewResponse._meta.fields]

@admin.register(ReviewResponseStatus)
class ReviewResponseStatusAdmin(ImportExportModelAdmin):
    list_display = [f.name for f in  ReviewResponseStatus._meta.fields]

@admin.register(ComplianceVendorTask)
class ComplianceVendorTaskAdmin(ImportExportModelAdmin):
    list_display = [f.name for f in  ComplianceVendorTask._meta.fields]

@admin.register(ComplianceVendorResponse)
class ComplianceVendorResponseAdmin(ImportExportModelAdmin):
    list_display = [f.name for f in  ComplianceVendorResponse._meta.fields]

@admin.register(ComplianceTaskCriteria)
class ComplianceTaskCriteriaAdmin(ImportExportModelAdmin):
    list_display = [f.name for f in  ComplianceTaskCriteria._meta.fields]

@admin.register(VendorComplianceStatus)
class VendorComplianceStatusAdmin(ImportExportModelAdmin):
    list_display = [f.name for f in  VendorComplianceStatus._meta.fields]

@admin.register(VendorComplianceHistory)
class VendorComplianceHistoryAdmin(ImportExportModelAdmin):
    list_display = [f.name for f in  VendorComplianceHistory._meta.fields]