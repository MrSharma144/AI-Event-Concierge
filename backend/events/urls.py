from django.urls import path
from . import views

urlpatterns = [
    path('propose/', views.propose_event, name='propose_event'),
    path('history/', views.get_history, name='get_history'),
]
