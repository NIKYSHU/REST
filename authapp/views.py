from django.shortcuts import render

from rest_framework.viewsets import ModelViewSet
from .models import User
from .serializers import AuthorModelSerializer


class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = AuthorModelSerializer
