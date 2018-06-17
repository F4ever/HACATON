# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from disease.choices import Ratio
from pcm.utils import CoreModel

from product.models import Component


class Disease(CoreModel):
    description = models.TextField(blank=True)

    def __str__(self):
        return '{}'.format(self.title)


class RelayComponent(models.Model):
    disease = models.ForeignKey(Disease, related_name='components_m2m', on_delete=models.CASCADE)
    component = models.ForeignKey(Component, related_name='disease_m2m', on_delete=models.CASCADE)

    status = models.PositiveSmallIntegerField(choices=Ratio.choices)
    description = models.TextField(blank=True)

    def __str__(self):
        return '{}:{}'.format(self.disease, self.component)
