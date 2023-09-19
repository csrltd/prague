from django.urls import path
from .views.index import index

urlpatterns = [
    path('home/', index, name='home')
]

