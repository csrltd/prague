from django.shortcuts import render

def swingbed(request):
    return render(request, 'swingbed/swingbed.html')

def rehabService(request):
    return render(request, 'rehabilitation/rehabilitation.html')

def caseManagement(request):
    return render(request, 'case-management/case_management.html')