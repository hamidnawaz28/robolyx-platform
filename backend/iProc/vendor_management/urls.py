from django.urls import path, include 
from rest_framework import routers
from .views import VendorRequestViewSet, VendorTagsViewSet, CategoriesViewSet, TradesViewSet, DiversityClassificationViewSet, \
VendorBasicViewSet, CertificatesAndLisencesViewSet, VendorAddressViewSet, VendorUploadView, VendorUploadDetail, NotesViewSet, \
VendorHistoryViewSet, ReviewTemplateViewSet, ReviewResponseViewSet, ReviewResponseStatusViewSet, ComplianceVendorTaskViewSet, \
ComplianceVendorResponseViewSet, ComplianceTaskCriteriaViewSet, VendorComplianceStatusViewSet, VendorComplianceHistoryViewSet, \
ApprovedVendorsViewSet, PendingVendorsViewSet, VendorTagsList, VendorTradesList, VendorCategoriesList, DiversityClassificationList, \
ComplianceTaskViewSet

router=routers.DefaultRouter()
router.register("vendor-req", VendorRequestViewSet, basename='vendor-req')
router.register("vendor-tag", VendorTagsViewSet, basename='vendor-tag')
router.register("vendor-cat", CategoriesViewSet, basename='vendor-cat')
router.register("vendor-trade", TradesViewSet, basename='vendor-trade')
router.register("diversity-class", DiversityClassificationViewSet, basename='diversity-class')
router.register("vendor-basic", VendorBasicViewSet, basename='vendor-basic')
router.register("vendor-cert-lisc", CertificatesAndLisencesViewSet, basename='vendor-cert-lisc')
router.register("vendor-address", VendorAddressViewSet, basename='vendor-address')
router.register("notes", NotesViewSet, basename='notes')
router.register("vendor-history", VendorHistoryViewSet, basename='vendor-history')
router.register("review-template", ReviewTemplateViewSet, basename='review-template')
router.register("review-response", ReviewResponseViewSet, basename='review-response')
router.register("review-response-status", ReviewResponseStatusViewSet, basename='review-response-status')
router.register("comp-vendor-task", ComplianceVendorTaskViewSet, basename='comp-vendor-task')
router.register("comp-vendor-response", ComplianceVendorResponseViewSet, basename='comp-vendor-response')
router.register("comp-task-criteria", ComplianceTaskCriteriaViewSet, basename='comp-task-criteria')
router.register("vendor_compliance-status", VendorComplianceStatusViewSet, basename='vendor_compliance-status')
router.register("review-response-history", VendorComplianceHistoryViewSet, basename='review-response-history')
router.register("approved-vendors", ApprovedVendorsViewSet, basename='approved-vendors')
router.register("pending-vendors", PendingVendorsViewSet, basename='pending-vendors')
router.register("vendor-tags-list", VendorTagsList, basename='vendor-tags-list')
router.register("vendor-trades-list", VendorTradesList, basename='vendor-trades-list')
router.register("vendor-cats-list", VendorCategoriesList, basename='vendor-cats-list')
router.register("vendor-diversity-list", DiversityClassificationList, basename='vendor-diversity-list')
router.register("compliance-task", ComplianceTaskViewSet, basename='compliance-task')



urlpatterns = [
    path('', include(router.urls)),
    path('vendor-upload/', VendorUploadView.as_view(), name='vendor-upload'),
    path('vendor-upload/<int:pk>/', VendorUploadDetail.as_view(), name='vendor-upload-detail'),
]
