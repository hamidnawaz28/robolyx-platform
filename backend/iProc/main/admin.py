from django.contrib import admin
from .models import InvoiceData, Role, UserProject, \
      UserData, TaxonomyData, RuleEngine, RuleEngineHistory, \
      ContractData, GLOrgData, POData,  DefaultTemplate, SavedTemplate


class InvoiceDataAdmin(admin.ModelAdmin):
    list_display = ["INVOICE_ID", "GL_DATE", "INV_ORIGIN", "INV_DATE",
                    "INV_SOURCE", "INV_NUMBER", "VENDOR_NUMBER", "VENDOR_NAME",
                    "VENDOR_TYPE", "INV_TERMS", "LINE_NUMBER", "LINE_TYPE", "LINE_DESCRIPTION",
                    "LINE_QUANTITY", "LINE_UNIT_PRICE", "LINE_UNIT_OF_MEASURE", "LINE_AMOUNT",
                    "GENERAL_LEDGER", "LOCATION", "DEPARTMENT", "ACCOUNT", "PO_NUMBER",
                    "CREATION_DATE", "UserProjectReference"]


class TaxonomyDataAdmin(admin.ModelAdmin):
    list_display = ["MAIN_CATEGORY", "CATEGORY_LEVEL_ONE", "CATEGORY_LEVEL_TWO", "CATEGORY_LEVEL_THREE",
                    "CATEGORY_LEVEL_FOUR", "CATEGORY_LEVEL_FIVE"]


class DefaultTemplateAdmin(admin.ModelAdmin):
    list_display = ["TableName", "Items", "UserProjectReference"]


class SavedTemplateAdmin(admin.ModelAdmin):
    list_display = ["MappingName", "MappedItems", "FileColumns", "DATE_ENTERED",
                    "DataTableReference", "UserProjectReference"]


admin.site.register(InvoiceData, InvoiceDataAdmin)
admin.site.register(TaxonomyData, TaxonomyDataAdmin)
admin.site.register(ContractData)
admin.site.register(GLOrgData)
admin.site.register(POData)
admin.site.register(DefaultTemplate, DefaultTemplateAdmin)
admin.site.register(SavedTemplate, SavedTemplateAdmin)
admin.site.register(Role)
admin.site.register(UserProject)
admin.site.register(UserData)
admin.site.register(RuleEngine)
admin.site.register(RuleEngineHistory)
