from django.shortcuts import render

def price(request):
    return render(request, 'price/price.html')
