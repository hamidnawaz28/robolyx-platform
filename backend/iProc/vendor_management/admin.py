from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import VendorRequest


@admin.register(VendorRequest)
class VendorRequestAdmin(ImportExportModelAdmin):
    list_display = [f.name for f in  VendorRequest._meta.fields]