from django.urls import path
from .views import DeleteNote, GetNotes, AddNote

urlpatterns = [
    path('get-notes/', GetNotes.as_view()),
    path('add-note/', AddNote.as_view()),
    path('delete-note/', DeleteNote.as_view()),
]
