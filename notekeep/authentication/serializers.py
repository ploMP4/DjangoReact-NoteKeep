from rest_framework import serializers
from .models import MyUser

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = '__all__'

class AuthenticateUserSerializer(serializers.ModelSerializer):
    email = serializers.CharField(validators=[])
    password = serializers.CharField(validators=[])
    
    class Meta:
        model = MyUser
        fields = ('email', 'password')