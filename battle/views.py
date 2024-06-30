from django.shortcuts import render

def battle_home(request):
    return render(request, 'battle_home.html')
