from django.db import models

from pcm.utils import CoreModel


class Component(CoreModel):
    code = models.CharField(null=True, blank=True, max_length=256)
    description = models.TextField(blank=True)

    def __str__(self):
        return '{}'.format(self.title)


class ComponentContainer(models.Model):
    parent = models.ForeignKey(Component, on_delete=models.CASCADE, related_name='parents')
    children = models.ForeignKey(Component, on_delete=models.CASCADE, related_name='childrens')
