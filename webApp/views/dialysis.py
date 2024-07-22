from django.shortcuts import render

def dialysis(request):
    return render(request, 'dialysis/dialysis.html',{"page_title":"Dialysis"})