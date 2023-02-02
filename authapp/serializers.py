from rest_framework.serializers import HyperlinkedModelSerializer
from .models import User


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'username')


class UserModelSerializerBase(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('is_superuser', 'is_staff')

