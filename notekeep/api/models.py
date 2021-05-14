from django.db import models
from authentication.models import MyUser

class Note(models.Model):
    title = models.CharField(max_length=20, null=False)
    description = models.CharField(max_length=500, null=False)
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, default='')