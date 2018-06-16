from django.db import models
from django.contrib.auth.models import AbstractUser

from disease.models import Disease
from product.models import Component


class User(AbstractUser):
    disease = models.ManyToManyField(Disease)
    bad_components = models.ManyToManyField(Component)
