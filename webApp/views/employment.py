from django.shortcuts import render

def employment(request):
    return render(request, 'employment/employment.html',{"page_title":"Employment"})
