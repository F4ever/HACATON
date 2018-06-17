from django.conf.urls import url

from disease.views import DiseaseViewSet, DiseaseValidateViewSet


disease_urls = [
    url(r'^api/disease/$', DiseaseViewSet.as_view({'get': 'list'})),
    url(r'^api/components-validate/$', DiseaseValidateViewSet.as_view({'post': 'verify_products'})),
]
