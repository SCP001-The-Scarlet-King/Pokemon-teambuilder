from django.contrib import admin
from .models import Pokemon, Move, Ability, Item, Team, TeamPokemon

@admin.register(Pokemon)
class PokemonAdmin(admin.ModelAdmin):
    list_display = ('name', 'sprite_url', 'hp', 'attack', 'defense', 'sp_attack', 'sp_defense', 'speed')
    filter_horizontal = ('abilities', 'moves', 'items')

@admin.register(Move)
class MoveAdmin(admin.ModelAdmin):
    list_display = ('name', 'move_type', 'power', 'accuracy', 'pp', 'effect', 'category')

@admin.register(Ability)
class AbilityAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'effect')

class TeamPokemonInline(admin.TabularInline):
    model = TeamPokemon
    extra = 6
    filter_horizontal = ('moves',)

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'user')
    inlines = [TeamPokemonInline]

@admin.register(TeamPokemon)
class TeamPokemonAdmin(admin.ModelAdmin):
    list_display = ('team', 'pokemon', 'ability', 'item', 'slot')
    filter_horizontal = ('moves',)