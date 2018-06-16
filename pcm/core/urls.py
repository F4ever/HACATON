from django.conf.urls import url

from .views import *


core_urls = [
    url(r'^api/sign-up/$', ProfileViewSet.as_view({'post': 'create'})),
    url(r'^api/log-in/$', ProfileViewSet.as_view({'post': 'login'})),
    url(r'^api/log-out/$', ProfileViewSet.as_view({'get': 'logout'})),
    url(r'^api/profile/$', ProfileViewSet.as_view({'get': 'get_profile', 'post': 'update_profile'}))
]
