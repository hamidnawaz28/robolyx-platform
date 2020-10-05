from django.contrib import admin
from django.urls import path
from mapping import views
  
urlpatterns = [
    path('admin/', admin.site.urls),
    path('findAlltempletes/',views.InvoiceDefaultTempletesView, name='InvoiceDefaultTemplete'),
    path('savedtempletes/',views.InvoiceSavedTempletesView, name='InvoiceSavedTempletes'),
    path('invoicetablecolumns/',views.InvoiceDataColumnsView, name='InvoiceDataColumns')
]
