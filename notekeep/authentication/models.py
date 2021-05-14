from django.db import models

class MyUser(models.Model):
    name = models.CharField(max_length=20, unique=True)
    email = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=200, unique=True)
