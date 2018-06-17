from django.contrib import admin

from .models import *


class ComponentAdmin(admin.ModelAdmin):
    search_fields = ('title',)


admin.site.register(Component, ComponentAdmin)
