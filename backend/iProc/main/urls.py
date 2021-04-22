from django.urls import path, include
from rest_framework import routers
from main import views


router=routers.DefaultRouter()
router.register("userlist", views.UserList, basename='Userlists')


urlpatterns = [
    path('admin-data', views.admin_data, name='Admin Data'),
    # -------------------------------------UtilsUrls-------------------------------------------------
    path('utils', views.utils_view, name="Utils"),
    # -------------------------------------DataUrls---------------------------------------------------
    path('file-import/', views.file_import, name='Invoice And Taxonomy Data'),
    path('taxonomy-data', views.taxonomy_data_view, name="Taxonomy Data"),
    path('invoice-data', views.invoice_data_view, name="Invoice Data"),
    path('po-data', views.po_data_view, name="PO Data"),
    path('gl-data', views.gl_data_view, name="GL Data"),
    path('contract-data', views.contract_data_view, name="Contract Data"),
    path('manage-templates', views.manage_templates, name="Manage Templates"),
    path('default-templates', views.default_templates, name='Default Templates'),
    path('saved-templates', views.saved_templates, name='Saved Templates'),
    path('find-email-or-user-name', views.find_email_or_user, name='find email or user'),
    # -------------------------------------RuleEngineUrls-------------------------------------------------
    path('rule-engine', views.rule_engine_view, name='Rule Engine'),
    path('test-and-implement-rule/', views.test_and_implement_rule, name="Test And Implement Rule"),
    path('rule-engine-data', views.rule_engine_data, name='Rule Engine Data'),
    path('invoice-by-rule', views.invoice_by_rule, name='Invoice By Rule'),
    path('overwritten-rules', views.over_written_rules, name="Overwritten Rules"),
    path('statistical-summary', views.statistical_summary, name="Statistical Summary"),
    path('', include(router.urls)),
]
