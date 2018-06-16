from django.db import models

from pcm.utils import CoreModel


class Component(CoreModel):
    code = models.IntegerField(null=True)
    description = models.TextField(blank=True)

    components = models.ManyToManyField('product.Component')
