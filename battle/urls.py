from django.urls import path
from django.contrib import admin 
from .views import battle_home

urlpatterns = [
    path('', battle_home, name = 'battle_home'),
]
