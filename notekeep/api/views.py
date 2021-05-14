from django.shortcuts import render
from rest_framework.serializers import Serializer
from .models import Note
from authentication.models import MyUser
from rest_framework.views import APIView
from .serializers import NoteSerializer, AddNoteSerializer
from rest_framework.response import Response
from rest_framework import status


class GetNotes(APIView):
    serializer_class = NoteSerializer
    lookup_url_kwarg = 'name'

    def get(self, request, format=None):
        name = request.GET.get(self.lookup_url_kwarg)
        if name != None:
            user_result = MyUser.objects.filter(name=name)
            if user_result.exists():
                user = user_result[0]
                notes = Note.objects.filter(user=user)
                data = []
                for note in notes:
                    data.append(self.serializer_class(note).data)

                return Response(data, status=status.HTTP_200_OK)
        
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


class AddNote(APIView):
    serializer_class = AddNoteSerializer

    def post(self, request, format=None):
        if request.method == "POST":
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                name = serializer.data.get('username')
                if name != None:
                    user_result = MyUser.objects.filter(name=name)
                    if user_result.exists():
                        user = user_result[0]
                        title = serializer.data.get('title')
                        desc = serializer.data.get('description')
                        note = Note(title=title, description=desc, user=user)
                        note.save()
                        return Response(NoteSerializer(note).data, status=status.HTTP_201_CREATED)
        
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
            

class DeleteNote(APIView):
    def delete(self, request, format=None):
        if request.method == "DELETE":
            Note.objects.filter(id=request.data).delete()
            return Response({'Delete': 'Note deleted'}, status=status.HTTP_200_OK)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)