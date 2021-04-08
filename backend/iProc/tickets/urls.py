from django.urls import path, include
from rest_framework import routers
from .views import TicketViewSet, ListViewSet, IndexHistoryViewSet, ContentHistoryViewSet, TicketUploadView, TicketUploadDetail, ArchivedTicketsViewSet, archived_tickets_data_view

router=routers.DefaultRouter()
router.register("lists", ListViewSet, basename='lists')
router.register("tickets", TicketViewSet, basename='tickets')
router.register("history", IndexHistoryViewSet, basename='history')
router.register("content-history", ContentHistoryViewSet, basename='content-history')
router.register("archive-tickets", ArchivedTicketsViewSet, basename='archive-tickets')

urlpatterns = [
    path('', include(router.urls)),
    path('ticket-upload/', TicketUploadView.as_view(), name='ticket-upload'),
    path('ticket-upload/<int:pk>/', TicketUploadDetail.as_view(), name='ticket-upload-detail'),
    path('archive_tiks/', archived_tickets_data_view , name="archive_tiks"),
]