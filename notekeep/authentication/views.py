from django.shortcuts import render
from .models import MyUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CreateUserSerializer, AuthenticateUserSerializer
from django.contrib.auth.hashers import make_password, check_password
from django.http import JsonResponse

class CreateUser(APIView):
    serializer_class = CreateUserSerializer

    def post(self, request, format=None):
        if request.method == "POST":
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                username = serializer.data.get('name')
                email = serializer.data.get('email')
                password = make_password(serializer.data.get('password'))
                user = MyUser(name=username, email=email, password=password)
                user.save()
                self.request.session["signed_in"] = True
                self.request.session["username"] = user.name
                return Response({'Message': 'Success'}, status=status.HTTP_201_CREATED)
        
        return Response({'Bad Request': 'Could not create user'}, stauts=status.HTTP_400_BAD_REQUEST)

class AuthUser(APIView):
    serializer_class = AuthenticateUserSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        if request.method == "POST":
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                user_result = MyUser.objects.filter(email=serializer.data.get('email'))
                if user_result.exists():
                    user = user_result[0]
                    password = user.password
                    if check_password(request.data["password"], password):
                        self.request.session["signed_in"] = True
                        self.request.session["username"] = user.name
                        return Response({'Message': 'Success'}, status=status.HTTP_200_OK)

            return Response({'Bad Request': 'Could not authenticate user'}, status=status.HTTP_400_BAD_REQUEST)

class IsUserSignedIn(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        data = {
            'auth': self.request.session.get('signed_in'),
            'username': self.request.session.get('username')
        }

        return JsonResponse(data, status=status.HTTP_200_OK)

class SignOut(APIView):
    def get(self, request, format=None):
        if 'signed_in' in self.request.session:
            self.request.session.pop('signed_in')
            self.request.session.pop('username')
        
        return Response({'Message': 'Success'}, status=status.HTTP_200_OK)