from django.contrib import admin
from .models import AllTempletes,SavedTempletes,invoiceColumns
class TempleteAdmin(admin.ModelAdmin):
      list_display = ['templeteName','templeteItems']
class SavedTempleteAdmin(admin.ModelAdmin):
      list_display = ['SavedTempleteName','SavedTempleteColumns','defaultTempleteReference']
class InvoiceColumnsAdmin(admin.ModelAdmin):
      list_display =     ["INVOICE_ID","GL_DATE","INV_ORGINE","INV_DATE","INV_SOURCE","INV_NUMBER","VENDOR_NUMBER","VENDOR_NAME","VENDOR_TYPE","INV_TERMS","LINE_NUMBER","LINE_TYPE","LINE_DESCRIPTION","LINE_QUANTITY","LINE_UNIT_PRICE","LINE_UNIT_OF_MEASURE","LINE_AMOUNT","GENERAL_LEDGER","LOCATION","DEPARTMENT","ACCOUNT","PO_NUMBER","CREATION_DATE","AllTempletesPK","SavedTempletesPK"]
admin.site.register(AllTempletes,TempleteAdmin)
admin.site.register(SavedTempletes,SavedTempleteAdmin)
admin.site.register(invoiceColumns,InvoiceColumnsAdmin)
