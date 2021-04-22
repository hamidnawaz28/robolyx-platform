from django.urls import path, include 
from rest_framework import routers
from .views import BusinessUnitViewSet, DepartmentViewSet, TagsViewSet, RegionsViewSet, DivisionsViewSet, SitesViewSet

router=routers.DefaultRouter()
router.register("buss_units", BusinessUnitViewSet, basename='buss_units')
router.register("dep", DepartmentViewSet, basename='dep')
router.register("tags", TagsViewSet, basename='tags')
router.register("regions", RegionsViewSet, basename='regions')
router.register("divs", DivisionsViewSet, basename='divs')
router.register("sites", SitesViewSet, basename='sites')


urlpatterns = [
    path('', include(router.urls)),
]