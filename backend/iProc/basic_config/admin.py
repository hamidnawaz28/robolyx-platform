from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import BusinessUnit, Department, Regions, Divisions, Sites, Tags


@admin.register(Sites)
class SitesAdmin(ImportExportModelAdmin):
    list_display = [f.name for f in  Sites._meta.fields]


@admin.register(BusinessUnit)
class BUAdmin(ImportExportModelAdmin):
    list_display = [f.name for f in  BusinessUnit._meta.fields]

@admin.register(Department)
class DeptAdmin(ImportExportModelAdmin):
    list_display = [f.name for f in  Department._meta.fields]

@admin.register(Regions)
class RegionsAdmin(ImportExportModelAdmin):
    list_display = [f.name for f in  Regions._meta.fields]

@admin.register(Divisions)
class DivAdmin(ImportExportModelAdmin):
    list_display = [f.name for f in  Divisions._meta.fields]

@admin.register(Tags)
class TagsAdmin(ImportExportModelAdmin):
    list_display = [f.name for f in  Tags._meta.fields]