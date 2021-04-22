from django.urls import path, include
from rest_framework import routers
from .views import TicketViewSet, ContentHistoryViewSet, TicketUploadView, TicketUploadDetail, ArchivedTicketsViewSet

router=routers.DefaultRouter()
router.register("tickets", TicketViewSet, basename='tickets')
router.register("content-history", ContentHistoryViewSet, basename='content-history')
router.register("archive-tickets-list", ArchivedTicketsViewSet, basename='archive-tickets-list')


urlpatterns = [
    path('', include(router.urls)),
    path('ticket-upload/', TicketUploadView.as_view(), name='ticket-upload'),
    path('ticket-upload/<int:pk>/', TicketUploadDetail.as_view(), name='ticket-upload-detail'),
]