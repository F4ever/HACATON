from django.conf.urls import url

from .views import *


product_urls = [
    url(r'^api/components/$', ComponentViewSet.as_view({'get': 'list'})),
]
