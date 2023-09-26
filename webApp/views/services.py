from django.shortcuts import render

def swingbed(request):
    return render(request, 'services/swingbed.html')