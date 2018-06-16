from rest_framework import serializers

from product.models import Component


class ComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = serializers.ALL_FIELDS
