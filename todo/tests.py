from django.test import TestCase
from rest_framework.test import APIRequestFactory
from todo.views import TodoModelViewSet
from rest_framework import status
from rest_framework.test import force_authenticate
from authapp.models import User
from todo.models import Todo, Project
from rest_framework.test import APIClient, APITestCase


class TestTodoViewSet(TestCase):
    def test_user_get_todo_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/todo/')
        user = User.objects.create_user(username='user', password='0000')
        force_authenticate(request, user)
        view = TodoModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_auth_set_user(self):
        client = APIClient()
        user = User.objects.create_user(username='mik', password='0000')
        client.login(username='mik', password='0000')
        response = client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestTodoViewSet2(APITestCase):
    def test_user_set_note_in_list(self):
        project = Project.objects.create(name_project='survey')
        user = User.objects.create(username='nikita', password='0000')
        note = Todo.objects.create(text_note='hello', project_id=project, user_note=user)
        response = self.client.post('/api/todo/', {'text_note': 'abs',
                                                   'project_id': note.project_id.id,
                                                   'user_note': note.user_note.id}, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
