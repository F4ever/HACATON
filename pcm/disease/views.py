# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.response import Response

from disease.choices import Ratio
from pcm.utils import BaseViewSet
from disease.serializers import DiseaseSerializer
from disease.models import Disease
from product.models import ComponentContainer, Component


class BadRelationException(Exception):
    def __init__(self, message):
        self.message = message


class DiseaseViewSet(BaseViewSet):
    serializer_class = DiseaseSerializer
    queryset = Disease.objects.all()


class DiseaseValidateViewSet(BaseViewSet):

    def _verify_component(self, request,  component):
        rating = 0

        for component_local in ComponentContainer.objects.filter(parent=component):
            rating += 2 - self._verify_component(request, component_local.children)

        if request.user.bad_components.filter(id=component.id).exists():
            raise BadRelationException('Very bad')

        if request.user.disease.filter(components_m2m__status=Ratio.Bad, components_m2m__component=component).exists():
            return BadRelationException('Very bad')

        return rating

    def verify_products(self, request, *args, **kwargs):
        """
        {
            code: 2142142,
            title: 'some title',
            components: ['come', 'components', 'else']
        }
        """
        products = request.data

        result = []

        for product in products:
            if product is None:
                return Response(status=201)

            for component in product['components']:
                Component.objects.get_or_create(title=component)
            try:
                components = Component.objects.filter(code=product['code'])
                raiting = 1
                if components.exists():
                    self._verify_component(request, components[0])
                else:
                    main_component, _ = Component.objects.get_or_create(code=product['code'], defaults={'title': product['title']})
                    components = Component.objects.filter(title__in=product['components'])
                    for component in components:
                        ComponentContainer.objects.get_or_create(parent=main_component, children=component)
                        raiting += self._verify_component(request, component)

                result.append({
                    **product,
                    'status': raiting,
                    'description': ''
                })
            except BadRelationException as err:
                result.append({
                    **product,
                    'status': 0,
                    'description': err
                })

        return Response(status=200, data=result)
