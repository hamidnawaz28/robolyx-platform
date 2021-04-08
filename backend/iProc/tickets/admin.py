from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import Ticket, List, Ticket_upload, IndexHistory,  ContentHistory

@admin.register(List)
class ListAdmin(ImportExportModelAdmin):
    list_display = [f.name for f in List._meta.fields]

@admin.register(Ticket)
class TicketAdmin(ImportExportModelAdmin):
    list_display = ['id', 'ticket_title', ]

@admin.register(IndexHistory)
class HistoryAdmin(ImportExportModelAdmin):
    list_display = [f.name for f in IndexHistory._meta.fields]

@admin.register(ContentHistory)
class ContentHistoryAdmin(ImportExportModelAdmin):
    list_display = [f.name for f in  ContentHistory._meta.fields]

@admin.register(Ticket_upload)
class TicketUploadAdmin(ImportExportModelAdmin):
    list_display = [f.name for f in  Ticket_upload._meta.fields]
