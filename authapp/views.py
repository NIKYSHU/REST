from django.shortcuts import render

from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework import mixins
from .models import User
from .serializers import UserModelSerializer, UserModelSerializerBase
from rest_framework.permissions import AllowAny, IsAuthenticated


class UserModelViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, GenericViewSet, mixins.UpdateModelMixin):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return UserModelSerializerBase
        return UserModelSerializer

    def get_queryset(self):
        pk = self.request.query_params.get('pk', '')
        users = User.objects.all()
        if pk:
            return User.objects.filter(pk=pk)
        return users
