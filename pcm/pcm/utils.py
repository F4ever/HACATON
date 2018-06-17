from django.db import models
from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication
from rest_framework.filters import SearchFilter
from rest_framework.permissions import IsAuthenticated


class CoreModel(models.Model):
    title = models.CharField(max_length=256)
    slug = models.CharField(max_length=128, blank=True)

    updated_at = models.DateTimeField(auto_now=True)
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '{}: {}'.format(self.title, self.slug)

    class Meta:
        abstract = True


class BaseViewSet(viewsets.ModelViewSet):
    authentication_classes = (SessionAuthentication, )
    permission_classes = (IsAuthenticated, )
    filter_backends = (SearchFilter,)
    search_fields = ('title', 'slug')
