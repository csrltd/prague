from django.shortcuts import render

def financial(request):
    return render(request, 'financial/financial.html',{"page_title":"Financial Services"})