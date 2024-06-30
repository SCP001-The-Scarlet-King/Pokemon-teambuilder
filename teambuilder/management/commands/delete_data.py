from django.core.management.base import BaseCommand
from teambuilder.models import Pokemon, Move, Ability, Item

class Command(BaseCommand):
    help = 'Clear all Pokémon, moves, abilities, and items data from the database'

    def handle(self, *args, **kwargs):
        self.stdout.write('Deleting all data...')
        
        # Delete whatever you want to delete
        Pokemon.objects.all().delete()
        Move.objects.all().delete()
        Ability.objects.all().delete()
        Item.objects.all().delete()

        self.stdout.write(self.style.SUCCESS('Successfully deleted all data.'))
