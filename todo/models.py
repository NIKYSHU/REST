from django.db import models
from authapp.models import User


class Project(models.Model):
    name_project = models.CharField(max_length=255)
    link_repo = models.URLField(blank=True, null=True)
    users_project = models.ManyToManyField(User, blank=True, null=True)


class Todo(models.Model):
    project_id = models.ForeignKey(Project, on_delete=models.CASCADE)
    text_note = models.TextField()
    date_create = models.DateTimeField(auto_now_add=True)
    date_update = models.DateTimeField(auto_now=True)
    user_note = models.ForeignKey(User, on_delete=models.CASCADE)
    active_note = models.BooleanField(default=True)
