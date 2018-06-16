# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from pcm.utils import BaseViewSet
from disease.serializers import DiseaseSerializer
from disease.models import Disease


class DiseaseViewSet(BaseViewSet):
    serializer_class = DiseaseSerializer
    queryset = Disease.objects.all()


class DiseaseValidateViewSet(BaseViewSet):

    def create(self, request, *args, **kwargs):
        pass
