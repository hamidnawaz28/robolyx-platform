from django.contrib import admin
from .models import InvoiceDefaultTempletes,InvoiceSavedTempletes,InvoiceDataColumns
class InvoiceDefaultTempletesAdminDisplay(admin.ModelAdmin):
      list_display = ['templeteName','templeteItems']
class InvoiceSavedTempletesAdminDisplay(admin.ModelAdmin):
      list_display = ['SavedTempleteName','SavedTempleteColumns','defaultTempleteReference']
class InvoiceDataColumsAdminDisplay(admin.ModelAdmin):
      list_display =     ["INVOICE_ID","GL_DATE","INV_ORGINE","INV_DATE","INV_SOURCE","INV_NUMBER","VENDOR_NUMBER","VENDOR_NAME","VENDOR_TYPE","INV_TERMS","LINE_NUMBER","LINE_TYPE","LINE_DESCRIPTION","LINE_QUANTITY","LINE_UNIT_PRICE","LINE_UNIT_OF_MEASURE","LINE_AMOUNT","GENERAL_LEDGER","LOCATION","DEPARTMENT","ACCOUNT","PO_NUMBER","CREATION_DATE","AllTempletesPK","SavedTempletesPK"]
admin.site.register(InvoiceDefaultTempletes,InvoiceDefaultTempletesAdminDisplay)
admin.site.register(InvoiceSavedTempletes,InvoiceSavedTempletesAdminDisplay)
admin.site.register(InvoiceDataColumns,InvoiceDataColumsAdminDisplay)
