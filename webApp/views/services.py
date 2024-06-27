from django.shortcuts import render

def swingbed(request):
    return render(request, 'swingbed/swingbed.html',{"page_title":"Swing Bed"})

def rehabService(request):
    return render(request, 'rehabilitation/rehabilitation.html', {"page_title":"Rehabilitation"})

def caseManagement(request):
    return render(request, 'case-management/case_management.html', {"page_title":"Case Management"})

def nursing(request):
    return render(request, 'nursing/nursing.html', {"page_title":"Nursing"})

def respiratory_therapy(request):
    return render(request, 'respiratory_therapy/respiratory_therapy.html', {"page_title":"Respiratory Therapy"})

def emergency(request):
    return render(request, 'emergency/emergency.html', {"page_title":"Emergency"})