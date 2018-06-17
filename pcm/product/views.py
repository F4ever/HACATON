from pcm.utils import BaseViewSet
from product.models import Component
from product.serializers import ComponentSerializer


class ComponentViewSet(BaseViewSet):
    serializer_class = ComponentSerializer
    queryset = Component.objects.filter(parents=None)
