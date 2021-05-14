from django.urls import path
from .views import AuthUser, CreateUser, IsUserSignedIn, SignOut

urlpatterns = [
    path('create-user/', CreateUser.as_view()),
    path('login/', AuthUser.as_view()),
    path('is-auth/', IsUserSignedIn.as_view()),
    path('logout/', SignOut.as_view()),
]
