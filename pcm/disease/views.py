# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.response import Response

from disease.choices import Ratio
from pcm.utils import BaseViewSet
from disease.serializers import DiseaseSerializer
from disease.models import Disease, RelayComponent
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

        if len(component.title) > 4:
            items = request.user.bad_components.filter(title__icontains=component.title[:5])
            if items.exists():
                items = items.filter(description__isnull=False)
                if items.exists():
                    raise BadRelationException(items.first().description)
                raise BadRelationException('Unknown')

            illes = RelayComponent.objects.filter(disease__user=request.user, status=Ratio.Bad, component__title__icontains=component.title[:5])
            if illes.exists():
                illes = illes.filter(description__isnull=False)
                if illes.exists():
                    raise BadRelationException(illes.first().description)
                raise BadRelationException('Very bad')

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
                    raiting += self._verify_component(request, components[0])
                else:
                    main_component, _ = Component.objects.get_or_create(code=product['code'], defaults={'title': product['title'][:80]})
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
                    'description': str(err)
                })

        return Response(status=200, data=result)
