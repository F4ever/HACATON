from django.conf.urls import url

from .views import *


core_urls = [
    url(r'^api/signup/$', ProfileViewSet.as_view({'post': 'create'})),
    url(r'^api/login/$', ProfileViewSet.as_view({'post': 'login'})),
    url(r'^api/logout/$', ProfileViewSet.as_view({'get': 'logout'})),
    url(r'^api/profile/$', ProfilePrivateViewSet.as_view({'get': 'get_profile', 'post': 'update_profile'}))
]
