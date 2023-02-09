from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from todo.models import Project, Todo
from rest_framework import serializers


class ProjectModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'name_project', 'link_repo', 'users_project']


class TodoModelSerializerBase(ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'


class TodoModelSerializer(ModelSerializer):
    project = ProjectModelSerializer

    class Meta:
        model = Todo
        fields = '__all__'
