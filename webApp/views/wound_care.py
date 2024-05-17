from django.shortcuts import render

def wound_care(request):
    return render(request, 'woundcare-service/woundcare.html')