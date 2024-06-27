from django.shortcuts import render

def about(request):
    return render(request, 'about/about.html',{"page_title":"About"})