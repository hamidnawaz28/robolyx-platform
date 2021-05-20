from django.urls import path, include
from rest_framework import routers
from main import views
router=routers.DefaultRouter()
router.register("userlist", views.UserList, basename='Userlists')
router.register('taxonomy-data', views.TaxonomyDataViewSet, basename="Taxonomy Data"),
router.register('invoice-data', views.InvoiceDataViewSet, basename="Invoice Data"),
router.register('po-data', views.PODataViewSet, basename="PO Data"),
router.register('gl-data', views.GLOrgDataViewSet, basename="GL Data"),
router.register('contract-data', views.ContractDataViewSet, basename="Contract Data"),
router.register('default-templates', views.DefaultTemplateViewSet, basename='Default Templates'),
router.register('saved-templates', views.SavedTemplateViewSet, basename='Saved Templates'),
router.register('file-import', views.FileImport, basename='Invoice And Taxonomy Data'),
router.register('utils', views.UtilsViewSet, basename="Utils"),
router.register('find-email-or-user-name', views.FindUserViewSet, basename='find email or user'),
router.register('rule-engine-data', views.RuleEngineData, basename='Rule Engine Data'),
router.register('invoice-by-rule', views.InvoiceByRule, basename='Invoice By Rule'),
router.register('overwritten-rules', views.OverWrittenRules, basename="Overwritten Rules"),
router.register('statistical-summary', views.StatisticalSummary, basename="Statistical Summary"),
router.register('test-and-implement-rule/', views.TestAndImplementRule, basename="Test And Implement Rule"),
router.register('rule-engine', views.RuleEngineViewSet, basename='Rule Engine'),
router.register('manage-templates', views.ManageTemplates, basename="Manage Templates"),
router.register('admin-data', views.AdminDataViewSet, basename='Admin Data')
urlpatterns = [
    path('', include(router.urls)),
]
