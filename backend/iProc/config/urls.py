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
    path('api/ticket/', include('tickets.urls'))
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)