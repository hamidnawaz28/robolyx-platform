from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import Ticket,  Ticket_upload,  ContentHistory

@admin.register(Ticket)
class TicketAdmin(ImportExportModelAdmin):
    list_display = [f.name for f in  Ticket._meta.fields]

@admin.register(ContentHistory)
class ContentHistoryAdmin(ImportExportModelAdmin):
    list_display = [f.name for f in  ContentHistory._meta.fields]

@admin.register(Ticket_upload)
class TicketUploadAdmin(ImportExportModelAdmin):
    list_display = [f.name for f in  Ticket_upload._meta.fields]
