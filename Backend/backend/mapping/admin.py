from django.contrib import admin
from .models import AllTempletes,SavedTempletes,invoiceColumns
class TempleteAdmin(admin.ModelAdmin):
      list_display = ['templeteName','templeteItems']
class SavedTempleteAdmin(admin.ModelAdmin):
      list_display = ['SavedTempleteName','SavedTempleteColumns','defaultTempleteReference']
# class AllColumnsAdmin(admin.ModelAdmin):
#       list_display = ['templeteName','templeteItems']
admin.site.register(AllTempletes,TempleteAdmin)
admin.site.register(SavedTempletes,SavedTempleteAdmin)
admin.site.register(invoiceColumns)
