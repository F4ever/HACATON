# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth import logout, login, authenticate
from rest_framework import viewsets, status
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from core.serializers import SignupSerializer, LoginSerializer, SimpleTitleSerializer
from core.models import User


class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = SignupSerializer
    authentication_classes = (SessionAuthentication, )
    queryset = User.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        user.set_password(serializer.data['password'])
        user.save()
        login(request, user)

        disease = SimpleTitleSerializer(request.user.disease.all(), many=True)
        bad_components = SimpleTitleSerializer(request.user.bad_components.all(), many=True)

        response = {
            'illnesses': disease.data,
            'bad_components': bad_components.data
        }

        return Response(response, status=status.HTTP_201_CREATED)

    def login(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(request, username=serializer.data['username'], password=serializer.data['password'])
        if user is not None:
            login(request, user)

            disease = SimpleTitleSerializer(request.user.disease.all(), many=True)
            bad_components = SimpleTitleSerializer(request.user.bad_components.all(), many=True)

            response = {
                'illnesses': disease.data,
                'bad_components': bad_components.data
            }

            return Response(status=200, data=response)
        return Response(status=404, data={'error': 'Username or password is wrong!'})

    def logout(self, request):
        logout(request)
        return Response(status=status.HTTP_202_ACCEPTED)


class ProfilePrivateViewSet(viewsets.ModelViewSet):
    serializer_class = SimpleTitleSerializer
    authentication_classes = (SessionAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_profile(self, request):
        disease = self.get_serializer(request.user.disease.all(), many=True)
        bad_components = self.get_serializer(request.user.bad_components.all(), many=True)

        response = {
            'illnesses': disease.data,
            'bad_components': bad_components.data
        }

        return Response(status=200, data=response)

    def update_profile(self, request):
        request.user.disease.set(request.data['illnesses'])
        request.user.bad_components.set(request.data['bad_components'])
        return self.get_profile(request)

