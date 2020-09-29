from django.contrib import admin
from django.urls import path
from mapping import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('findAlltempletes/',views.GivenColumns, name='AllTempletes'),
    path('savedtempletes/',views.SavedColumns, name='Saved Columns'),
    path('invoicetablecolumns/',views.InvoiceDataColumns, name='Invoice Data Table')
]
