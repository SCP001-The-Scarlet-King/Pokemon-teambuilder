from django.contrib.auth.models import User
from django.db import models

class Pokemon(models.Model):
    name = models.CharField(max_length=100, unique=True)
    sprite_url = models.URLField()
    hp = models.IntegerField()
    attack = models.IntegerField()
    defense = models.IntegerField()
    sp_attack = models.IntegerField()
    sp_defense = models.IntegerField()
    speed = models.IntegerField()
    level = models.IntegerField(default=100)
    ev_hp = models.IntegerField(default=0)
    ev_attack = models.IntegerField(default=0)
    ev_defense = models.IntegerField(default=0)
    ev_sp_attack = models.IntegerField(default=0)
    ev_sp_defense = models.IntegerField(default=0)
    ev_speed = models.IntegerField(default=0)
    iv_hp = models.IntegerField(default=31)
    iv_attack = models.IntegerField(default=31)
    iv_defense = models.IntegerField(default=31)
    iv_sp_attack = models.IntegerField(default=31)
    iv_sp_defense = models.IntegerField(default=31)
    iv_speed = models.IntegerField(default=31)
    abilities = models.ManyToManyField('Ability', related_name='pokemons')
    moves = models.ManyToManyField('Move', related_name='pokemons')
    items = models.ManyToManyField('Item', related_name='pokemons')

    def __str__(self):
        return self.name

class Ability(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Move(models.Model):
    name = models.CharField(max_length=100, unique=True)
    move_type = models.CharField(max_length=50)
    power = models.IntegerField(null=True, blank=True)
    accuracy = models.IntegerField(null=True, blank=True)
    pp = models.IntegerField()
    effect = models.TextField(null=True, blank=True)
    category = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Item(models.Model):
    name = models.CharField(max_length=100, unique=True)
    effect = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name

class Team(models.Model):
    name = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
class TeamPokemon(models.Model):
    team = models.ForeignKey(Team, related_name='team_pokemons', on_delete=models.CASCADE)
    pokemon = models.ForeignKey(Pokemon, on_delete=models.CASCADE)
    ability = models.ForeignKey(Ability, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    moves = models.ManyToManyField(Move)
    slot = models.IntegerField()  # To maintain the order of Pokémon in the team

    class Meta:
        unique_together = ('team', 'slot')

    def __str__(self):
        return f"{self.team.name} - {self.pokemon.name} (Slot {self.slot})"