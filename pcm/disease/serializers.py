from rest_framework import serializers

from disease.models import Disease


class DiseaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disease
        fields = serializers.ALL_FIELDS
