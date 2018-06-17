from django.contrib import admin

from .models import *


class ComponentAdmin(admin.ModelAdmin):
    search_fields = ('title',)
    ordering = ('title',)


admin.site.register(Component, ComponentAdmin)
