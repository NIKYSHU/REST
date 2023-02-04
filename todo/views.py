from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from todo.models import Project, Todo
from todo.serializers import ProjectModelSerializer, TodoModelSerializer, TodoModelSerializerBase
from rest_framework import pagination
from rest_framework.permissions import AllowAny


class ProjectLimitOffsetPagination(pagination.LimitOffsetPagination):
    default_limit = 10


class TodoLimitOffsetPagination(pagination.LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_fields = ['name_project', 'name_project']


class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
    filterset_fields = ['project_id', 'project_id']
    pagination_class = TodoLimitOffsetPagination
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return TodoModelSerializer
        return TodoModelSerializerBase

    # def get_queryset(self):
    #     name = self.request.query_params.get('name', '')
    #     note = Todo.objects.all()
    #     if name:
    #         note = note.filter(project_id__name_project=name)
    #     return note

    # def list(self, request, *args, **kwargs):
    #     obj_list = Todo.objects.filter(active_note=True)
    #     serializer = TodoModelSerializer(obj_list, many=True)
    #     return Response({'note': serializer.data})

    def destroy(self, request, *args, **kwargs):
        serializer = TodoModelSerializer(
            instance=Todo.objects.get(pk=kwargs['pk']),
            data={'active_note': False},
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({'note': TodoModelSerializer(Todo.objects.filter(active_note=True), many=True).data})
