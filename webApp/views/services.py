from django.shortcuts import render

def swingbed(request):
    return render(request, 'swingbed/swingbed.html')

def rehabService(request):
    return render(request, 'rehabilitation/rehabilitation.html')

def caseManagement(request):
    return render(request, 'case-management/case_management.html')

def nursing(request):
    return render(request, 'nursing/nursing.html')

def respiratory_therapy(request):
    return render(request, 'respiratory_therapy/respiratory_therapy.html')

def emergency(request):
    return render(request, 'emergency/emergency.html')