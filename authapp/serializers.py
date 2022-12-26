from rest_framework.serializers import HyperlinkedModelSerializer
from .models import User


class AuthorModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'username')
