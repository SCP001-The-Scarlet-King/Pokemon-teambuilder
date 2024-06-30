from django.urls import path
from . import views

urlpatterns = [
    path('', views.teambuilder, name='teambuilder'),
    path('edit-team/', views.edit_team, name='edit_team'),
    path('edit-team/<int:team_id>/', views.edit_team, name='edit_team_with_id'),
    path('get_all_pokemons/', views.get_all_pokemons, name='get_all_pokemons'),
    path('get_pokemon_details/<str:pokemon_name>/', views.get_pokemon_details, name='get_pokemon_details'),
    path('get_team_details/<int:team_id>/', views.get_team_details, name='get_team_details'),
]