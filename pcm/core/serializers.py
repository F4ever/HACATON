from rest_framework import serializers

from core.models import User


class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=128, allow_blank=False, required=True)
    password = serializers.CharField(max_length=128, allow_blank=False, required=True)


class SimpleTitleSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField()
