from django.shortcuts import render

from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework import mixins
from .models import User
from .serializers import AuthorModelSerializer


class UserModelViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, GenericViewSet, mixins.UpdateModelMixin):
    queryset = User.objects.all()
    serializer_class = AuthorModelSerializer

    def get_queryset(self):
        pk = self.request.query_params.get('pk', '')
        users = User.objects.all()
        if pk:
            return User.objects.filter(pk=pk)
        return users
