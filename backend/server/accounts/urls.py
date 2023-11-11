from django.urls import re_path as url
from django.conf.urls import include


accounts_urlpatterns = [
    url(r'^api/v1/', include('djoser.urls')),
    url(r'^api/v1/', include('djoser.urls.authtoken')),
]
