# Generated by Django 5.0.6 on 2024-06-20 21:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('teambuilder', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('pokemons', models.ManyToManyField(to='teambuilder.pokemon')),
            ],
        ),
    ]
