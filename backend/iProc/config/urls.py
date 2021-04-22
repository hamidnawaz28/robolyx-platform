from django.contrib import admin

from rest_framework_jwt.views import obtain_jwt_token
from django.urls import path, include, re_path
from . import views as iview
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    #path('', iview.index, name='index'),
    # re_path(r'^(api)/?$', iview.index, name='index'),
    re_path(r'^((?!(api|admin)).)*$', iview.index, name='index'),
    path('admin/', admin.site.urls),
    path('api/auth/token-auth/', obtain_jwt_token),
    path('api/core/', include('core.urls')),
    path('api/main/', include('main.urls')),
    path('api/ticket/', include('tickets.urls')),
    path('api/basic-configs/', include('basic_config.urls')),
    path('api/vendor_management/', include('vendor_management.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)