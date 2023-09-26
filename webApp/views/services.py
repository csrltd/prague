from django.shortcuts import render

def swingbed(request):
    return render(request, 'services/swingbed.html')

def rehabService(request):
    return render(request, 'services/rehabilitation.html')

def caseManagement(request):
    return render(request, 'services/case_management.html')